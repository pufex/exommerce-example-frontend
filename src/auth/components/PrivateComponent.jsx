import { useAuth } from "../AuthProvider";

export default function PrivateComponent({children}) {
    const {auth} = useAuth()
    return auth && children
}