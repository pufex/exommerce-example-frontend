import { Loader, LoaderCircle } from "lucide-react";
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate"
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProductRow from "../../components/admin/ProductRow";

export default function Products() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axiosPrivate.get("/admin/products")
                setProducts(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err)
                setError("Failed to fetch products from our API.")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleRefresh = async () => {
        try {
            setLoading(true)
            const response = await axiosPrivate.get("/admin/products")
            setProducts(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
            setError("Failed to fetch products from our API.")
        } finally {
            setLoading(false)
        }
    }

    return <>
        <div className="w-full flex justify-between py-6">
            <h1 className="text-3xl text-black font-bold">
                Products
            </h1>
            <div>
                <Button 
                    onClick={handleRefresh}
                    disabled={loading}
                >
                    {
                        !loading
                            ? "Refresh"
                            : <>
                                Refreshing...
                                <LoaderCircle className="w-4 h-4 text-white animate-spin"/>
                            </>
                    }
                </Button>
            </div>
        </div>
        {
            loading
                ? <div className="w-full py-20 flex items-center justify-center">
                    <LoaderCircle className="w-10 h-10 animate-spin text-red-600" />
                </div>
                : error
                    ? <h1 className="w-full text-center py-10 text-red-600 text-2xl font-bold">
                        Failed to fetch data from our API
                    </h1>
                    : <div className="w-full">
                        {
                            products.length === 0
                                ? <h1 className="w-full text-center text-xl text-black font-semibold py-6">
                                    There is no products to display.
                                </h1>
                                : <div className="w-full flex flex-col">
                                    {
                                        products.map((product) => (
                                            <ProductRow 
                                                key={product._id} 
                                                product={product}
                                                setProducts={setProducts}
                                            />
                                        ))
                                    }
                                </div>
                        }
                    </div>
        }
    </>
}
