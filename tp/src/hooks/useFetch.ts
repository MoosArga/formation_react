import { useEffect, useState } from "react";
import errorObservable from "../observer/ErrorObservable";
import loadingObservable from "../observer/LoadingObservable";

export default function useFetch<T>(url: string, deps: unknown[] = []): { data: T | undefined } {

    const [data, setData] = useState<T>();
    
    useEffect(() => {
        async function fetchData() {
            try {
                loadingObservable.activate();
                const response = await fetch(url);
                if (response.ok) {
                    const jsonData = await response.json() as T
                    setData(jsonData);
                } else {
                    errorObservable.notify('Bad request')
                }
            } catch(error: unknown) {
                errorObservable.notify((error as Error).message)
            } finally {
                loadingObservable.deactivate();
            }
        }

        fetchData();
    }, deps)

    return { data }
}