import type { ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { User } from "../types/auth";
import { AuthContext } from "./authContext";

function AuthProvider({children}: {children:ReactNode})
{
    const [user, setUser]= useLocalStorage<User|null>('taskflow.user', null)
    function login(nextUser:User)
    {
        setUser(nextUser)
    }
    function logout()
    {
        setUser(null)
    }
    return <AuthContext value={{user,login,logout}}>{children}</AuthContext>
}
export default AuthProvider