import { type JSX } from "react";
import type { Formation } from "./models/formation";
import styles from "./FormationManager.module.css";
import FormationCounter from "./FormationCounter";

type Props = {
    formations: Formation[],
    title?: string
}

export default function FormationManager({ formations, title }: Props): JSX.Element {

    const currentDate = (new Date()).toISOString();

    return (
        <>
            <h1>{ title || 'Mes formations'}</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Charge heure restante</th>
                            <th>Type formation</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        { formations.map(f => f.chargeH > 0 && (
                            <tr key={f.id} className={f.chargeH > 20 ? styles.formationHeavy : undefined}>
                                <td>{ f.nom }</td>
                                <td>{ f.chargeH }</td>
                                <td>{ f.typeF }</td>
                                <td>{ f.note }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>{ currentDate }</div>
            <FormationCounter></FormationCounter>
        </>
    )

}