import Button from "../Button";
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate";
import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useWindowSize } from "../../hooks/useWindowSizes"
import IconButton from "../IconButton"

export default function DeleteProductBtn({ product_id, setProducts }) {

    const [loading, setLoading] = useState(false)
    const { width: windowWidth } = useWindowSize()

    const axiosPrivate = useAxiosPrivate();

    const handleClick = async () => {
        try {
            setLoading(true)
            await axiosPrivate.delete(`/admin/delete-product/${product_id}`)
            setProducts(products => products.filter((product) => product._id != product_id))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return windowWidth > 600
        ? <Button
            onClick={handleClick}
            disabled={loading}
        >
            {
                !loading
                    ? "Delete"
                    : <>
                        Deleting...
                        <LoaderCircle className="w-6 h-6 text-white animate-spin" />
                    </>
            }
        </Button>
        : <IconButton
            onClick={handleClick}
            disabled={loading}
        >
            {
                !loading
                    ? <Trash2 className="w-6 h-6" />
                    : <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
            }
        </IconButton>
}