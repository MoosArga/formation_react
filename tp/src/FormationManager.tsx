import { type JSX } from "react";
import { Link } from "react-router-dom";
import FormationCounter from "./FormationCounter";
import styles from "./FormationManager.module.css";
import useFormations from "./hooks/useFormations";
import FormationForm from "./FormationForm";
import DateForm from "./DateForm";

export default function FormationManager(): JSX.Element {

    const currentDate = (new Date()).toISOString();
    const { formations, stats, refresh, loading }  = useFormations();

    return (
        <div className="formation">
            <h1>Mes formations</h1>
            { formations?.length && (<div className="formation-list">
                    <button className="button-primary" onClick={() => refresh()}>Refresh 
                        { loading && ' ...' }
                    </button>
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
                                    <td><Link to={`/formations/${f.id}`}>{ f.nom }</Link></td>
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
                    <FormationForm></FormationForm>
                    <DateForm></DateForm>
                </div>
            )}
            <div>{ currentDate }</div>
            <FormationCounter></FormationCounter>
        </div> 
    )

}