import {useAuth} from "../AuthProvider.jsx"
import {Outlet, Navigate} from "react-router"

export default function AdminRoute () {
    const {auth} = useAuth()
    console.log(auth)
    return auth && auth.user.isAdmin
        ? <Outlet />
        : <Navigate to="/" replace={true} />
}