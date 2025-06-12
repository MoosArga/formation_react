import { useEffect, useReducer, useRef, useState } from "react";

export interface CompteurHook {
    counter: number;
    updateCounter: (value: number) => void;
    incremente: (step: number) => void;
    modified: boolean;
    previousValue: number | null;
    rollback(): void
}

type TypeAction = 'set' | 'increment' | 'decrement' | 'rollback';

type Action = { 
    type: TypeAction, 
    value: number 
}

export function useCompteur(): CompteurHook {

    const previousValue = useRef<number | null>(null);
    const [canUndo, setCanUndo] = useState<boolean>(previousValue.current !== null)

    const [counter, dispatchCounter] = useReducer<number, number, [Action]>(counterReducer, 0, () => Number.parseInt(localStorage.getItem('counter') ?? '0'))

    useEffect(() => {
        localStorage.setItem('counter', counter.toString())
    }, [counter]);

    function updateCounter(value: number) {
        previousValue.current = counter;
        setCanUndo(true)
        dispatchCounter({ type: 'set', value })
    }

    function incremente(step: number): void {
        previousValue.current = counter;
        setCanUndo(true)
        dispatchCounter({ type: 'increment', value: step })
    }

    function rollback(): void {
        if (previousValue.current) {
            dispatchCounter({ type: 'set', value: previousValue.current })
            previousValue.current = null;
            setCanUndo(false)
        }
    }

    return { 
        counter, 
        updateCounter, 
        incremente, 
        modified: canUndo, 
        rollback, 
        previousValue: previousValue.current 
    }

}

function counterReducer(prevState: number, action: Action): number {
    switch(action.type) {
        case 'set': {
            return action.value;
        }
        case 'increment': {
            return prevState + action.value;
        }
        default: {
            return prevState
        }
    }
}