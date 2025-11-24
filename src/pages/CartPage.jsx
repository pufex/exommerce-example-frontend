import { Link } from "react-router";
import { useCart } from "../contexts/CartProvider"
import Button from "../components/Button";
import ChangeItemCount from "../components/ChangeItemCount"
import RemoveItemFromCart from "../components/RemoveItemFromCart"
import { useWindowSize } from "../hooks/useWindowSizes"

export default function CartPage() {
    const { cart } = useCart();
    const { width: windowWidth } = useWindowSize()
    return cart.length === 0
        ? <div className="py-8 px-4 w-full">
            <h2 className="w-full text-center text-black text-2xl font-semibold mb-6">
                Your cart is empty
            </h2>
            <p className="text-xl font-medium text-center w-full">
                <Link to="/products" className="text-red-500 font-medium underline">Start browsing</Link> our collection and fill up the cart!
            </p>
        </div>
        : <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start p-4">
            <section className="w-full bg-gray-200 rounded-lg border border-black/20 p-6 shadow-md">
                <h1 className="w-full text-left text-2xl font-semibold text-black">
                    SUMMARY
                </h1>
                <ul className="py-4 w-full">
                    {
                        cart.map((item) => (
                            <li key={item._id}>
                                <span className="text-red-600 font-semibold">{item.title}</span>, <span className="text-black font-semibold">${item.price} X {item.count} = ${item.price * item.count}</span>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl text-black font-semibold">
                        TOTAL: ${cart.reduce((A, V) => A + V.price * V.count, 0)}
                    </h2>
                    <Button>
                        Buy now!
                    </Button>
                </div>
            </section>
            <section className="w-full bg-gray-200 border border-black/20 shadow-lg rounded-lg overflow-hidden">
                <ul className="w-full flex flex-col">
                    {
                        cart.map(item => (
                            <li
                                key={item._id}
                                className="w-full h-20 bg-gray-200 px-4 border-b-black/20 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.photoURL}
                                        alt={item.title}
                                        className="w-10 h-10 object-cover object-center border border-black/20 rounded-md"
                                    />
                                    <h2 className="text-xl font-semibold">
                                        {item.title}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    {
                                        windowWidth > 500 && <p className="text-lg font-semibold">
                                            $<span className="text-red-600">{item.price}</span>
                                            {"  X  "}{item.count}
                                        </p>
                                    }
                                    <ChangeItemCount item={item} />
                                    <RemoveItemFromCart item_id={item._id} />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
}