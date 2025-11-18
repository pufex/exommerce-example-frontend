import DeleteProductBtn from "./DeleteProductBtn"

export default function ProductRow({product, setProducts}) {
    return <div className="w-full border-b-2 border-b-black/20 rounded-md h-20 flex px-4 items-center justify-between gap-4" >
        <h3 className="text-2xl text-black font-semibold">
            {product.title}
        </h3>
        <div className="flex items-center gap-4">
            <p className="text-xl text-black">
                ${product.price}
            </p>
            <DeleteProductBtn 
                product_id={product._id}
                setProducts={setProducts}
            />
        </div>
    </div>
}