import { createContext, useContext, useState } from "react";

const key = "ecommerce-example-app-key"
const CartContext = createContext({})

export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({children}){

    const [cart, setCart] = useState(!localStorage.getItem(key) ? [] : JSON.parse(localStorage.getItem(key)))

    return <CartContext.Provider value={{cart}}>
        {children}
    </CartContext.Provider>
}