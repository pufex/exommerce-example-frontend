import Button from "../Button"
import IconButton from "../IconButton"
import { useNavigate } from "react-router"
import { useWindowSize } from "../../hooks/useWindowSizes"
import { Pencil } from "lucide-react"

export default function EditProductBtn({ product_id }) {
    const navigate = useNavigate()
    const { width: windowWidth } = useWindowSize()

    const handleClick = () => navigate(`/admin/products/edit/${product_id}`) 

    return windowWidth > 600
        ? <Button onClick={handleClick}>
            Edit
        </Button>
        : <IconButton onClick={handleClick}>
            <Pencil className="w-6 h-6 text-white"/>
        </IconButton>
}