import { Minus, Plus } from "lucide-react"
import IconButton from "./IconButton"
import { useCart } from "../contexts/CartProvider"

export default function ChangeItemCount({item: {_id: item_id, count}}) {

    const {incrementItem, decrementItem} = useCart()

    return <div className="flex items-center gap-3">
        <IconButton onClick={() => decrementItem(item_id)}>
            <Minus className="w-5 h-5 text-white" />
        </IconButton>
        <div className="w-10 h-10 border border-black/20 rounded-lg bg-white text-lg flex items-center justify-center">
            {count}
        </div>
        <IconButton onClick={() => incrementItem(item_id)}>
            <Plus className="w-5 h-5 text-white" />
        </IconButton>
    </div>
}