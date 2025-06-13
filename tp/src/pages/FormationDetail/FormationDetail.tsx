import { type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useFormations from "../../hooks/useFormations";
import type { Formation } from "../../models/formation";

export default function FormationDetail(): JSX.Element {

    const { idFormation } = useParams<{ idFormation: string }>()
    const { data: formation } = useFetch<Formation>(`http://localhost:3000/formations/${idFormation}`, [idFormation]);
    const { formations } = useFormations();
    const navigate = useNavigate();

    function next() {
        const indexFormation = formations.findIndex(f => f.id === idFormation);
        if (indexFormation < formations.length - 1) {
            const newIdFormation = formations[indexFormation + 1].id
            navigate(`/formations/${newIdFormation}`)
        }
    }

    return (
        <>
            <div>{formation?.nom}</div>
            <div>{formation?.typeF}</div>
            <div>{formation?.note}</div>
            <div>{formation?.chargeH}</div>
            <button className="button-primary" onClick={next}>Next</button>
        </>
    )

}