import { publicAxios as axios } from "../api/axios"
import { useEffect, useState, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router";
import LoadingBlock from "../components/LoadingBlock";
import Button from "../components/Button";
import { usePagination } from "../hooks/usePagination"
import ProductsSearch from "../components/ProductsSearch";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get("search") ?? ""
    
    const onSearchChange = (e) => {
        setSearchParams(prev => {
            prev.set("search", e.target.value)
            return prev
        })
    }

    const searchedProducts = useMemo(() => {
        console.log("search: ",search)
        return products.filter((product) =>
            product
                .title
                .toUpperCase()
                .includes(search.toUpperCase())

    )}, [products, search])

    const {
        list: paginatedProducts,
        PaginationButtons
    } = usePagination(searchedProducts, 8);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axios.get("/products")
                const products = response.data
                setProducts(products)
                console.log(products)
            } catch (err) {
                console.log(err)
                setError("Failed to fetch products from our API.")
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return loading
        ? <LoadingBlock />
        : error
            ? <h1 className="w-full text-center text-2xl font-semibold text-red-600 py-8">
                {error}
            </h1>
            : <section className="w-full px-4 py-2">
                <div className="mb-8">
                    <h1 className="w-full text-center font-bold text-black text-4xl py-8">
                        Browse Our Products!
                    </h1>
                    <p className="w-full mx-auto max-w-[600px] text-center">
                        Our latest collection contains electronic items of extreme variety. Buy our products in good prices. Consider creating an account to receive periodical discounts for our buyers only.
                    </p>
                    <ProductsSearch
                        className="max-w-[600px] mx-auto mb-4 mt-6"
                        value={search}
                        onChange={onSearchChange}
                    />
                </div>
                <div className="w-full py-4">
                    <div className="flex items-center gap-2 mb-4">
                        {/* {PreviousButton} */}
                        {PaginationButtons}
                        {/* {NextButton} */}
                    </div>
                    {
                        paginatedProducts.length === 0
                            ? <h1 className="w-full text-center text-lg font-medium">
                                This search has no products to display. Try something else.
                            </h1>
                            : <ul className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2">
                                {paginatedProducts
                                    .map(product => (
                                        <li
                                            key={product._id}
                                            className="w-full bg-gray-200 p-2 border border-black/20 shadow-md rounded-lg"
                                        >
                                            <h1 className="w-full text-left text-2xl font-semibold mb-4">{product.title}</h1>
                                            <div className="w-full h-[400px] mb-4">
                                                <img
                                                    src={product.photoURL}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl">
                                                    <span className="text-red-600 font-bold">${product.price}</span>
                                                    <span className="text-black font-bold">, instock: {product.instock}</span>
                                                </p>
                                                <Button onClick={() => navigate(`/products/${product._id}`)}>
                                                    Buy
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                    }
                </div>
            </section>
}