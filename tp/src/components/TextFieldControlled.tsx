import { useId, type ChangeEvent, type JSX } from "react"

type Props = {
    name: string, 
    value: string | undefined,
    register: (name: string) => {
        name: string;
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    },
    errors: Record<string, string>,
    label: string
}

export default function TextFieldControlled({ name, value, register, errors, label }: Props): JSX.Element {

    const id = useId();

    return (
        <div className="form-entry">
            <label htmlFor={id}>{label}</label>
            <input type="text" id={id} value={value} {...register(name)}></input>
            { errors && errors[name] && (
                <div>{errors[name]}</div>
            )}
        </div>
    )

}