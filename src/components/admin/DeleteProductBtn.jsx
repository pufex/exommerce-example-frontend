import Button from "../Button";
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function DeleteProductBtn({product_id, setProducts}){

    const [loading, setLoading] = useState(false)

    const axiosPrivate = useAxiosPrivate();

    const handleClick = async () => {
        try{
            setLoading(true)
            await axiosPrivate.delete(`/admin/delete-product/${product_id}`)
            setProducts(products => products.filter((product) => product._id != product_id))
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }
    
    return <Button
        onClick={handleClick}
        disabled={loading}
    >
        {
            !loading
                ? "Delete"
                : <>
                    Deleting...
                    <LoaderCircle className="w-6 h-6 text-white animate-spin"/>
                </>
        }
    </Button>
}