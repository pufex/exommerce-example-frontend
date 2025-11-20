import {useParams, useNavigate} from "react-router"
import { useState, useEffect } from "react"
import {useCart} from "../contexts/CartProvider"
import {publicAxios as axios} from "../api/axios"
import LoadingBlock from "../components/LoadingBlock"
import Button from "../components/Button"

export default function ProductPage(){

    const navigate = useNavigate()
    const {id: product_id} = useParams()
    
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const {addToCart} = useCart()
    const handleBuy = () => {
        addToCart({...product, count: 1})
        navigate("/products")
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                setLoading(true)
                const response = await axios.get(`/products/${product_id}`)
                const product = response.data
                console.log(product)
                setProduct(product)
            }catch(err){
                console.log(err)
                setError("Product not found.")
            }finally{
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    return loading
        ?  <LoadingBlock />
        : error
            ? <h1 className="w-full text-center text-red-600 font-semibold text-lg">
                {error}
            </h1> 
            : <div className="w-full px-4 py-20">
                <div className="w-full bg-gray-200 border-2 border-black/20 p-8 rounded-lg shadow-lg flex flex-col-reverse gap-8  lg:grid lg:grid-cols-2">
                    <div className="w-full h-[400px] flex items-center">
                        <img 
                            src={product.photoURL}
                            alt={product.title}
                            className="h-full w-full object-cover object-center border border-black/20 rounded-md shadow-lg"
                        />
                    </div>
                    <div className="w-full flex flex-col justify-between gap-4">
                        <div className="w-full">
                            <h1 className="w-full text-left text-3xl font-semibold mb-8">
                                {product.title}
                            </h1>
                            <p className="text-lg font-medium mb-4">
                                Description: 
                            </p>
                            <p className="text-base">
                                {product.description}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-xl">
                                <span className="text-red-600 font-semibold text-xl">${product.price}</span>
                                , <span className="font-semibold text-xl">instock: {product.instock}</span>
                            </p>
                            <Button onClick={handleBuy}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
}