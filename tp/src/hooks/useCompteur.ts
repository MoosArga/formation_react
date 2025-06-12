import { useEffect, useRef, useState } from "react";

export interface CompteurHook {
    counter: number;
    updateCounter: (value: number) => void;
    incremente: (step: number) => void;
    modified: boolean;
    previousValue: number | null;
    rollback(): void
}

export function useCompteur(): CompteurHook {

    const previousValue = useRef<number | null>(null);
    const [canUndo, setCanUndo] = useState<boolean>(previousValue.current !== null)

    const [counter, setCounter] = useState<number>(
        () => Number.parseInt(localStorage.getItem('counter') ?? '0'))

    useEffect(() => {
        localStorage.setItem('counter', counter.toString())
    }, [counter]);

    function updateCounter(value: number) {
        previousValue.current = counter;
        setCanUndo(true)
        setCounter(value);
    }

    function incremente(step: number): void {
        previousValue.current = counter;
        setCanUndo(true)
        setCounter(counter + step)
    }

    function rollback(): void {
        if (previousValue.current) {
            setCounter(previousValue.current);
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