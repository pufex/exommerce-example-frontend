import { Outlet, Navigate } from "react-router";
import { useAuth } from "../AuthProvider";

export default function UnloggedRoute () {
    const {auth} = useAuth();
    return auth 
        ? <Navigate to="/" replace={true} />
        : <Outlet />
}