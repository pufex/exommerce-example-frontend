import { useAuth } from "../AuthProvider";
import { Outlet, Navigate } from "react-router";

export default function PrivateRoute () {
    const {auth} = useAuth();
    return !auth 
        ? <Navigate to="/auth/login" replace={true} />
        : <Outlet />
}