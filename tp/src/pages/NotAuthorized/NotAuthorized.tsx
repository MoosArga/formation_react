import { useLocation } from "react-router-dom"

export default function NotAuthorized() {
    const location = useLocation();
    const state = location?.state?.from?.pathname || 'Ressource inconnue'

    return (
        <div>
            <>
                Vous n'êtes pas autorisé à accéder à cette ressource 
                { state }
            </>
        </div>
    )
}