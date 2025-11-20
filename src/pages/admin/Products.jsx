import { LoaderCircle, MoveLeft, MoveRight } from "lucide-react";
import { useSearchParams } from "react-router"
import { useAxiosPrivate } from "../../auth/hooks/useAxiosPrivate"
import { useEffect, useState } from "react";
import pagination from "../../utils/pagination"
import Button from "../../components/Button";
import ProductRow from "../../components/admin/ProductRow";
import PaginationButton from "../../components/PaginationButton"

const productsPerPage = 8

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const axiosPrivate = useAxiosPrivate();

    const currentPage = !searchParams.get("page") || !Number(searchParams.get("page")) 
        ? 1
        : Number(searchParams.get("page"))
    const pageStart = (currentPage - 1) * productsPerPage
    const pageEnd = currentPage * productsPerPage;

    const setCurrentPage = (page) => {
        setSearchParams(prev => {
            prev.set("page", page)
            return prev
        })
    }

    const goPreviousPage = () => {
        setSearchParams(prev => {
            const page = Number(prev.get("page"))
            if (page && page - 1 > 0) {
                prev.set("page", (page - 1).toString())
            }
            return prev
        })
    }

    const goNextPage = () => {
        setSearchParams(prev => {
            const page = !prev.get("page")
                ? 1
                : Number(prev.get("page"))
            if (page && page + 1 <= Math.ceil(products.length / productsPerPage)) {
                prev.set("page", (page + 1).toString())
            }
            return prev
        })
    }

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

    useEffect(() => {
        if (Math.ceil(products.length / productsPerPage) < Number(searchParams.get("page"))) {
            setSearchParams(prev => {
                console.log("what")
                prev.set("page", "1")
                return prev
            })
        }
    }, [products])

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
                                <LoaderCircle className="w-4 h-4 text-white animate-spin" />
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
                                : <>
                                    <div className="flex gap-2 items-center pt-4">
                                        {
                                            currentPage !== 1 && Math.ceil(products.length / productsPerPage) > 1
                                                ? <PaginationButton
                                                    onClick={goPreviousPage}
                                                >
                                                    <MoveLeft />
                                                </PaginationButton>
                                                : null
                                        }
                                        {
                                            pagination(currentPage, Math.ceil(products.length / productsPerPage), 5)
                                                .map((value) => (
                                                    <PaginationButton 
                                                        key={value}
                                                        onClick={() => setCurrentPage(value)}
                                                    >
                                                        {value}
                                                    </PaginationButton>
                                                ))
                                        }
                                        {
                                            currentPage !== Math.ceil(products.length / productsPerPage) && <PaginationButton
                                                onClick={goNextPage}
                                            >
                                                <MoveRight />
                                            </PaginationButton>
                                        }
                                    </div>
                                    <div className="w-full flex flex-col">
                                        {
                                            products
                                                .slice(pageStart, pageEnd)
                                                .map((product) => (
                                                    <ProductRow
                                                        key={product._id}
                                                        product={product}
                                                        setProducts={setProducts}
                                                    />
                                                ))
                                        }
                                    </div>
                                </>
                        }
                    </div>
        }
    </>
}
