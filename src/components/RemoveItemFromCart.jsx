import { Trash2 } from "lucide-react"
import IconButton from "./IconButton"
import { useCart } from "../contexts/CartProvider"

export default function RemoveItemFromCart ({item_id}) {

    const {removeFromCart} = useCart()

    return <IconButton
        onClick={() => removeFromCart(item_id)}
        className={`h-10 w-10 flex items-center justify-center rounded-lg border-2 bg-red-600 border-red-800 cursor-pointer hover:bg-red-500 active:bg-red-400`}
        type={"button"}
    >
        <Trash2 className="w-5 h-5 text-white" />
    </IconButton>
}