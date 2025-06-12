import { Navigate, Route, Routes } from "react-router-dom";
import FormationManager from "./FormationManager";
import FormationDetail from "./pages/FormationDetail/FormationDetail";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound/NotFound";

const AboutLazy = lazy(() => import('./pages/About/About'))

export default function AppRoutes() {

    return ( 
        <Suspense fallback={ <div>Chargement...</div> }>
            <Routes>
                <Route path="/" element={<FormationManager></FormationManager>}></Route>
                <Route path="/accueil" element={<Navigate to="/" replace /> }></Route>
                <Route path="/formations/:idFormation" element={<FormationDetail /> }></Route>
                <Route path="/about" element={<AboutLazy />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Suspense>
    )

}