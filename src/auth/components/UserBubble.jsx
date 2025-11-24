import { useState, useEffect, useRef } from "react";
import { useAuth } from "../AuthProvider"
import UserBubbleButton from "./UserBubbleButton";
import UserBubbleLogout from "./UserBubbleLogout";
import { Cog } from 'lucide-react';
import {useNavigate} from "react-router"

export default function UserBubble () {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const {auth} = useAuth();

    const boxRef = useRef(null)

    const toggleBox = (e) => {
        e.stopPropagation()
        setVisible(prev => !prev)
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(visible && boxRef.current !== e.target){
                setVisible(false)
            }
        }

        window.addEventListener("click", handleOutsideClick)

        return () => window.removeEventListener("click", handleOutsideClick)
    })

    return auth && <div className="relative">
        <img 
            // Todo: add an actual user image.
            onClick={toggleBox}
            src="default-avatar.jpg"
            alt={auth.user.name}
            className="object-cover object-center w-10 h-10 rounded-full border-3 border-red-800"
        />
        {
            visible && <div
                    className="absolute top-[[calc(100%+1rem)]] right-0 w-[250px] border-2 border-black/20 rounded-lg bg-gray-200 overflow-hidden"
                    ref={boxRef}
                >
                    <div className="py-4 px-2 w-full">
                        <p className="text-lg text-left font-medium text-black">
                            Welcome, {auth.user.name}!
                        </p>
                    </div>
                    <ul className="w-full">
                        <li className="w-full">
                            <UserBubbleButton onClick={() => navigate("/profile/settings")}>
                                Settings <Cog className="w-5 h-5 text-black" />
                            </UserBubbleButton>
                        </li>
                        <li className="w-full">
                            <UserBubbleLogout />
                        </li>
                    </ul>   
                </div>
        }
    </div>
}