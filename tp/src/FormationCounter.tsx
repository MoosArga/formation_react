import { type JSX } from "react";
import { useCompteur, type CompteurHook } from "./hooks/useCompteur";

export default function FormationCounter(): JSX.Element {

    const { counter, updateCounter, incremente, modified, rollback }: CompteurHook = useCompteur();

    return (
        <fieldset className="formation-counter">
            <legend>Compteur</legend>
            <input type="text" value={counter} onChange={(event) => updateCounter(+event.target.value)} />
            <button className="button-primary" onClick={() => incremente(1)}>+1</button>
            <button className="button-primary" onClick={() => incremente(3)}>+3</button>
            <button className="button-primary" disabled={!modified} onClick={rollback}>Rollback</button>
        </fieldset>
    )
}