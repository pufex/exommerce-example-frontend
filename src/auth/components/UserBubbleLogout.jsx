import { useAuth } from "../AuthProvider";
import { useState } from "react";
import UserBubbleButton from "./UserBubbleButton";
import { LoaderCircle } from "lucide-react";
import { LogOut } from 'lucide-react';

export default function UserBubbleLogout ({setVisibility}) {
    const [loading, setLoading] = useState(false)
    const {logout} = useAuth();

    const handleClick = async () => {
        try{
            setLoading(true)
            await logout()
            setVisibility(false)
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    return <UserBubbleButton
        disabled={loading}
        onClick={handleClick}
    >
        {
            loading
                ? <>
                    Logging out...
                    <LoaderCircle className="w-5 h-5 animate-spin text-black"/>
                </>
                : <>
                    Log out
                    <LogOut className="w-5 h-5 text-black "/>
                </>
        }
    </UserBubbleButton>

}