import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { publicAxios } from "../api/axios"

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export default function AuthProvider ({children}) {

    const [auth, setAuth] = useState(null)

    const register = useCallback(async (name, email, password) => {
        try{
            await publicAxios.post(
                "/auth/register",
                {name, email, password},
            )
        }catch(err){
            console.log(err)
            throw err
        }
    })

    const login = useCallback(async (email, password) => {
        try{
            console.log(email)
            const response = await publicAxios.post(
                "/auth/login",
                {email, password},
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            setAuth(response.data)
        }catch(err){
            console.log(err)
            throw err
        }
    })

    const refresh = useCallback(async () => {
        try{
            const response = await publicAxios.get(
                "/auth/refresh",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            setAuth(response.data)
            console.log(response.data)
        }catch(err){
            console.log(err)
            throw err
        }
    })

    const logout = useCallback(async () => {
        try{
            await publicAxios.get("/auth/logout", {
                withCredentials: true,
            })
            setAuth(null)

        }catch(err){
            console.log(err)
        }
    })

    useEffect(() => {
        const getAccessToken = async () => {
            try{
                await refresh();
            }catch(err){
                console.log(err)
            }
        }

        getAccessToken();

    }, [])

    return <AuthContext.Provider value={{auth, register, login, refresh, logout}}>
        {children}
    </AuthContext.Provider>
}