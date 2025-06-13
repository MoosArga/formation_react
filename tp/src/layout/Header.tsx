import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function Header() {

    const user = useUserContext();

    return (
        <header id="header">
            <nav id="menu">
                <NavLink className={getNavLinkClasses} to="/">Accueil</NavLink>
                <NavLink className={getNavLinkClasses} to="/about">A propos</NavLink>
            </nav>
            <div>
                { user.nom } - { user.prenom }
            </div>
        </header>
    )

}

function getNavLinkClasses(renderProps: NavLinkRenderProps): string {
    return renderProps.isActive ? 'l-menu-entry l-menu-entry-active' : 'l-menu-entry'
} 