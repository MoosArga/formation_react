import { date, object, string } from "yup"
import useForm from "./hooks/useForm"
import TextFieldControlled from "./components/TextFieldControlled"

type DateFormModel = {
    date: string,
    numSecu: string
}

const dateFormValidationSchema = object<Partial<DateFormModel>>({
    date: date().transform((value: string) => new Date(value)).min(new Date(), 'Rien dans le passé, le grouillot !!'),
    numSecu: string().matches(/[01][0-9]{2}(0?[0-9]|1[0-2])()/)
})

export default function DateForm() {

    const submitFunction = (data: Partial<DateFormModel>, errors: unknown) => { console.log(data, errors) }

    const { formData: dateForm, errors, register } = useForm<Partial<DateFormModel>>(submitFunction, 
        { date: (new Date()).toISOString(), numSecu: '' }, 
        dateFormValidationSchema);

    return (
         <fieldset>
            <legend>Nouvelle formation</legend>
            <form className="form">
                <div className="form-entry">
                    <label>Date</label>
                    <input type="date" value={dateForm.date} {...register('date')} />
                </div>
                <TextFieldControlled name="numSecu" value={dateForm.numSecu} errors={errors} register={register} label="Numéro de secu"  ></TextFieldControlled>
            </form>
            { errors && (
                <>
                    <div>{errors.date}</div>
                </>
            )}
        </fieldset>
    )

}