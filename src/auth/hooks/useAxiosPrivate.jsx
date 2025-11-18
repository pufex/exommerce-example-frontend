import { privateAxios } from "../../api/axios"
import { useAuth } from "../AuthProvider"
import { useEffect } from "react"

export const useAxiosPrivate = () => {
    const {auth, refresh} = useAuth();

    useEffect(() => {

        const requestIntercept = privateAxios.interceptors.request.use(
            (config) => {
                if(!config.headers["authorization"]){
                    config.headers["authorization"] = `Bearer ${auth.accessToken}`
                }

                return config
            },
            (err) => Promise.reject(err)
        )

        const responseIntercept = privateAxios.interceptors.response.use(
            config => config,
            async (err) => {
                const prevRequest = err?.config
                if(err?.response.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true
                    const accessToken = await refresh() 
                    prevRequest.headers["authorization"] = `Bearer ${accessToken}`
                    return privateAxios(prevRequest)
                }
                return Promise.reject(err)
            }
        )

        return () => {
            privateAxios.interceptors.request.eject(requestIntercept)
            privateAxios.interceptors.response.eject(responseIntercept)
        }
    }, [])
    
    return privateAxios;
}