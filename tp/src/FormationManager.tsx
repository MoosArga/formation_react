import { type JSX } from "react";
import FormationCounter from "./FormationCounter";
import styles from "./FormationManager.module.css";
import useFormations from "./hooks/useFormations";

export default function FormationManager(): JSX.Element {

    const currentDate = (new Date()).toISOString();
    const { formations, stats, refresh }  = useFormations();

    return (
        <>
            <h1>Mes formations</h1>
            { formations?.length && (<div>
                    <button onClick={() => refresh()}>Refresh</button>
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
                    <table>
                        <thead>
                            <tr>
                                <th>Type de formation</th>
                                <th>Nombre de formation</th>
                                <th>Note moyenne</th>
                                <th>Charge heure cumulée</th>
                            </tr>
                        </thead>
                        <tbody>
                            { stats.map(s => (
                                <tr key={s.typeF}>
                                    <td>{s.typeF}</td>
                                    <td>{s.nbFormation}</td>
                                    <td>{s.noteMoyenne}</td>
                                    <td>{s.chargeHCumulee}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
            <div>{ currentDate }</div>
            <FormationCounter></FormationCounter>
        </> 
    )

}