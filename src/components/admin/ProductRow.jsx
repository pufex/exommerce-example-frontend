import DeleteProductBtn from "./DeleteProductBtn"
import EditProductBtn from "./EditProductBtn"

export default function ProductRow({product, setProducts}) {
    return <div className="w-full border-b-2 border-b-black/20 rounded-md h-20 flex px-2 sm:px-4 items-center justify-between gap-2" >
        <h3 className="text-lg sm:text-2xl text-black font-semibold text-nowrap">
            {product.title}
        </h3>
        <div className="flex items-center gap-2 sm:gap-4">
            <p className="text-base sm:text-lg text-black">
                ${product.price}
            </p>
            <EditProductBtn product_id={product._id} />
            <DeleteProductBtn 
                product_id={product._id}
                setProducts={setProducts}
            />
        </div>
    </div>
}