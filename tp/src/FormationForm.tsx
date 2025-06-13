import type { JSX } from "react";
import { number, object, string } from "yup";
import { Formation } from "./models/formation";
import useForm from "./hooks/useForm";

const formationValidationSchema = object<Partial<Formation>>({
    nom: string().required('Le nom est obligatoire'),
    note: number().required('La note est obligatoire').min(0, 'La note doit être au moins de 0').max(10, 'La note ne peut dépasser 10'),
    typeF: string().required('Le type de formation est obligatoire'),
    chargeH: number().required('La charge heure est obligatoire'),
})

export default function FormationForm(): JSX.Element {

    const handleSubmit = (data: Partial<Formation>, errors: unknown) => { console.log(data, errors) }

    const { formData: formationForm, errors, register } = 
    useForm<Partial<Formation>>(handleSubmit, new Formation(), formationValidationSchema)

    return (
        <fieldset>
            <legend>Nouvelle formation</legend>
            <form className="form">
                <div className="form-entry">
                    <label>Nom</label>
                    <input type="text" value={formationForm.nom} {...register('nom')} />
                </div>
                <div className="form-entry">
                    <label>Type de formation</label>
                    <select value={formationForm.typeF} {...register('typeF')}>
                        <option value="indexation">Indexation</option>
                        <option value="code">Code</option>
                        <option value="book">Book</option>
                    </select>
                </div>
                <div className="form-entry">
                    <label>Charge heure</label>
                    <input type="text" value={formationForm.chargeH} {...register('chargeH')} />
                </div>
                <div className="form-entry">
                    <label>Note</label>
                    <input type="number" value={formationForm.note} {...register('note')} />
                </div>
                <div className="form-entry">
                    <button className="button-primary" disabled={!!errors.nom || !!errors.chargeH || !!errors.note || !!errors.nom }>Ajouter</button>
                </div>
                {
                    errors && (
                        <>
                            <div>{errors.nom}</div>
                            <div>{errors.typeF}</div>
                            <div>{errors.chargeH}</div>
                            <div>{errors.note}</div>
                        </>
                    )
                }
            </form>
        </fieldset>
    )

}