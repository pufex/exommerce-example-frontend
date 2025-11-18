import { useAuth } from "../AuthProvider";

export default function UnloggedComponent ({children}) {
    const {auth} = useAuth()
    return !auth && chidlren
}