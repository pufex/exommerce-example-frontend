import { useState } from "react";
import { useAuth } from "../AuthProvider";
import { LoaderCircle } from "lucide-react";
import Button from "../../components/Button";

export default function LogoutListButton () {

    const {logout} = useAuth()
    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        try{
            setLoading(true)
            await logout();
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <Button 
        className={"w-full"}
        onClick={handleLogout}
        disabled={loading}
    >
        {
            loading
                ? <>
                    Logging out
                    <LoaderCircle className="w-8 h-8 text-black animate-spin"/>
                </>
                : "Log out"
        }   
    </Button>
}