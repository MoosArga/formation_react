import { type ChangeEvent, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { ObjectSchema, ValidationError } from 'yup';

interface FormProps<T> {
  formAction: () => void;
  pending: boolean;
  formState: T;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  submitCount: number;
  touched: Record<keyof T, boolean>;
  errors: Record<keyof T, string>;
  register: (name: keyof T) => {
    name: keyof T;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onBlur: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  };
}

function useForm<T extends Record<string, unknown>>(
  handleSubmit: (data: T, errors: Record<keyof T, string>) => void,
  initialState: T,
  validationSchema?: ObjectSchema<T>
): FormProps<T> {
  const [formState, setFormState] = useState(initialState);
  const { pending } = useFormStatus();
  const [submitCount, setSubmitCount] = useState(0);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<keyof T, string>>(
    {} as Record<keyof T, string>
  );
  
  const validate = async (data: T) => {
    let errors = {};
    try {
      await validationSchema?.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        errors = newErrors;
      
      }
    }
    return errors as Record<keyof T, string>;
  };

  async function onSubmit(formData: T): Promise<T> {
    setSubmitCount((count) => count + 1);
    const errors = await validate(formData);
    setErrors(errors);
    await handleSubmit(formData, errors);
    return formData;
  }

  const formAction = async () => {
    const newState = await onSubmit(formData);
    setFormState(newState);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (validationSchema) {
      const fieldSchema = validationSchema.pick([name]);
      fieldSchema
        .validate({ [name]: value })
        .then(() => {
          setErrors((currErrors) => ({ ...currErrors, [name]: '' }))
        })
        .catch((err) =>
          
          setErrors((currErrors) => ({ ...currErrors, [name]: err.message }))
        );
    }
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const register = (name: keyof T) => ({
    name,
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return {
    pending,
    formState,
    submitCount,
    touched,
    errors,
    formData,
    setFormData,
    formAction,
    register
  };
}

export default useForm;