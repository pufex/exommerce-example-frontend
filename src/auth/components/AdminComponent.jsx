import { useAuth } from "../AuthProvider"

export default function AdminComponent({children}){
    const {auth} = useAuth()
    return auth && auth.user.isAdmin
        ? children
        : null
}