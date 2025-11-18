import { useAuth } from "../AuthProvider";
import { useState } from "react";

export default function LogoutNavButton() {
    const {logout} = useAuth();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try{
            setLoading(true)
            await logout();
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <button 
        className="text-lg text-white font-semibold"
        onClick={handleClick}
        disabled={loading}
    >
        {
            loading
                ? "Logging out..."    
                : "Log out"
        }
    </button>
}