export interface User {
    id: string; 
    nom: string;
    prenom: string;
    role: 'administrateur' | 'utilisateur';
}