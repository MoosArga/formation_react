import { createContext, useContext, useMemo, useState, type JSX } from "react";

interface ErrorContextModel {
    hasError: boolean;
    errorMessage?: string;
    setErrorMessage?: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextModel>({ hasError: false })

export function ErrorContextProvider({ children }: { children: JSX.Element }) {

    const [errorMessage, setErrorMessage] = useState<string>('')
    const hasError = useMemo(() => !!errorMessage, [errorMessage])

    return (
        <ErrorContext.Provider value={{ hasError, errorMessage, setErrorMessage }}>
            { !hasError ? children : <div>{ errorMessage }</div> }
        </ErrorContext.Provider>
    )

}

export function useErrorContext() {
    const context = useContext(ErrorContext);
    if (!context) throw Error('Tu es en dehors du contexte du provider !!!!!!')
    return context;
}