import {useNavigate} from "react-router"
import {useCart} from "../contexts/CartProvider"
import { ShoppingCart } from "lucide-react"

export default function CartButton(){
    
    const navigate = useNavigate()
    const {cart} = useCart()
    
    return <div 
        className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/cart")}
    >
        <ShoppingCart className="w-8 h-8 text-white" />
        <div className="w-4 h-4 absolute top-0 right-0 rounded-full bg-white text-red-600 font-bold text-sm flex items-center justify-center">
            {cart.reduce((A,V) => A + V.count, 0)}
        </div>
    </div>
}