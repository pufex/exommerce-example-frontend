import Button from "../Button"
import { useNavigate } from "react-router"

export default function EditProductBtn({product_id}) {
    const navigate = useNavigate()
    return <Button onClick={() => navigate(`/admin/products/edit/${product_id}`)}>
        Edit
    </Button>
}