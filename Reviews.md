# Jour 1 : 

- **JSX :** Mélange entre JS et HTML. Templating qu'on peut exploiter côté JS 
- **Composant :** Bloc réutilisable de l'interface 
    - Functionnal Component : Fonction (React.FC qui retournent des JSX.Element) permettent d'utiliser les hooks 
    - Pure function
- **Les Hooks :** Fonctions qui permettent de gérer le state management
    - *useState :* permet de modifier un state, se décline dans un couple [valeur, setValeur]. setValeur soit une valeur brute, soit une fonction avec l'ancienne valeur
    - *useEffect :* Exécuté après le rendu, en fonction des dépenances. useEffect(() => { ... }, [dependances])
- **Style :** Différentes architectures et différentes façons d'appliquer du style 
    - *style* : style inline dans une balise HTML 
    - *classe CSS statique* : classe CSS en dur (chaine de caractères)
    - *CSS module* : import en JS / TS
- **Vite :**  Bundle qui m'a permis de générer mon projet :    
    - Préparer un environnement de dev local 
    - Préparer le build de production de mon application 
    - Linter, Tests automatisés, ...

# Jour 2 : 

- **Les hooks :** 
    - *useRef :* state qui ne déclenche pas de re-render quand il change. Soit c'est pour créer une référence à un élément du DOM, soit de créer une variable persistante entre les rendus. 
    - *useReducer :* traiter des modifications du state au travers d'une fonction de réduction
    - *useMemo :* définition d'une variable en fonction du cycle de changement des dépendances 
    - *useCallback :* défintion d'une fonction en fonction du cycle de changement des dépendances 
    - *useContext :* gérer un state de maniètre transverse sur l'ensemble d'un pan de l'application : 
        - Context : création d'un context au travers de createContext
        - Context Provider : Template JSX qui me permet de définir le périmètre de mon contexte
        - useContext : Récupérer le context courant
- **Le rendering** 
- **La consommation d'API**
    - fetch : consommé dans un useEffect pour mettre à jour un useState
- **Le router :** React router
    - Context de routage au travers de BrowserRouter 
    - Au sein duquel nous avons déclaré des Routes <Routes><Route>...</Routes>
        - Route de redirection path, <Navigate to>
        - Route "classique" ou eager path, element
        - Route joker path="*" element (NotFound)
        - Route avec path param path=".../:param"
        - Route fille 
        - Routes lazy
    - Définir des <Outlet>
    - Liens de navigations : 
        - Link 
        - NavLink : comportement pour détecter si la route est active et donc y associer un style
    - Hooks portés par React Router 
        - useParams : récupérer les path params (:param)
        - useLocation : récupérer les queries params
        - useNavigate : naviguer programmatiquement notamment avec le -1