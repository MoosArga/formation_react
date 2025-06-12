import { useEffect, useState, type JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Formation } from "../../models/formation";

export default function FormationDetail(): JSX.Element {

    const [formation, setFormation] = useState<Formation>();
    const { idFormation } = useParams<{ idFormation: string }>()
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
        const newIdFormation = (+idFormation! + 1).toString()
        navigate(`/formations/${newIdFormation}`)
    }

    return (
        <>
            <div>{formation?.nom}</div>
            <div>{formation?.typeF}</div>
            <div>{formation?.note}</div>
            <div>{formation?.chargeH}</div>
            <button onClick={next}>Next</button>
        </>
    )

}