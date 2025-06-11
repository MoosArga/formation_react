import { useEffect, useState, type JSX } from "react";

export default function FormationCounter(): JSX.Element {

    const [counter, setCounter] = useState<number>(
        () => Number.parseInt(localStorage.getItem('counter') ?? '0'))


    useEffect(() => {
        localStorage.setItem('counter', counter.toString())
    }, [counter])

    function incremente(step: number): void {
        setCounter(counter + step)
    }

    return (
        <>
            <label>Compteur</label>
            <input type="text" value={counter} onChange={(event) => setCounter(+event.target.value)} />
            <button onClick={() => incremente(1)}>+1</button>
            <button onClick={() => incremente(3)}>+3</button>
        </>
    )
}