import { type JSX } from "react";
import { useCompteur, type CompteurHook } from "./hooks/useCompteur";

export default function FormationCounter(): JSX.Element {

    const { counter, updateCounter, incremente, modified, rollback }: CompteurHook = useCompteur();

    return (
        <>
            <label>Compteur</label>
            <input type="text" value={counter} onChange={(event) => updateCounter(+event.target.value)} />
            <button onClick={() => incremente(1)}>+1</button>
            <button onClick={() => incremente(3)}>+3</button>
            <button disabled={!modified} onClick={rollback}>Rollback</button>
        </>
    )
}