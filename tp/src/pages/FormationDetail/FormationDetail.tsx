import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Formation } from "../../models/formation";
import useFormations from "../../hooks/useFormations";

export default function FormationDetail(): JSX.Element {

    const [formation, setFormation] = useState<Formation>();
    const { idFormation } = useParams<{ idFormation: string }>()
    const { formations } = useFormations();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Le use params a changé !!!')
        async function fetchData() {
            const response = await fetch(`http://localhost:3000/formations/${idFormation}`)
            if (response.ok) {
                const data = await response.json();
                setFormation(data as Formation)
            }
        }
        fetchData()
    }, [idFormation])

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