import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function Header() {

    const user = useUserContext();

    return (
        <div>
            <NavLink to="/about">A propos</NavLink>
            { user.nom } - { user.prenom }
        </div>
    )

}