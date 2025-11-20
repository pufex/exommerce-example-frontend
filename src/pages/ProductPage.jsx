import {useParams, useNavigate} from "react-router"
import { useState, useEffect } from "react"
import {useCart} from "../contexts/CartProvider"
import {publicAxios as axios} from "../api/axios"
import LoadingBlock from "../components/LoadingBlock"
import Button from "../components/Button"
import ProductCounter from "../components/ProductCounter"

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
            : <div className="w-full sm:px-4 sm:py-20">
                <div className="flex flex-col-reverse p-8 bg-gray-200 min-h-screen justify-start gap-6 sm:min-h-auto sm:border-2 sm:border-black/20 sm:rounded-lg sm:shadow-lg lg:grid lg:grid-cols-2">
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
                        <div className="w-full flex flex-col items-left sm:items-center gap-2 sm:gap-0 sm:flex-row justify-between grow sm:grow-0">
                            <p className="text-xl w-full sm:w-auto">
                                <span className="text-red-600 font-semibold text-xl">${product.price}</span>
                                , <span className="font-semibold text-xl">instock: {product.instock}</span>
                            </p>
                            <ProductCounter product={product}/>
                        </div>
                    </div>
                </div>
            </div>
}