import { createContext, useContext } from "react";
import type { User } from "../types/auth";

export interface AuthContextValue {
    user : User| null
    login : (user: User) => void
    logout : () => void
}

export const AuthContext = createContext<AuthContextValue|null>(null);
export function useAuth(): AuthContextValue
{
    const context = useContext(AuthContext)
    if(!context) throw new Error('use auth must be used inside auth provider')
    return context 
}