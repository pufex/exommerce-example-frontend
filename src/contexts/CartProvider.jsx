import { createContext, useContext, useState, useCallback } from "react";

const key = "ecommerce-example-app-key"
const CartContext = createContext({})

export const useCart = () => {
    return useContext(CartContext)
}

export default function CartProvider({children}){

    const [cart, setCart] = useState(!localStorage.getItem(key) ? [] : JSON.parse(localStorage.getItem(key)))

    const addToCart = useCallback((item, count) => {
        setCart(prev => {
            const newCart = prev.find((i) => i._id === item._id)
                ? prev.map(i => i._id === item._id ? {...i, count: i.count + count} : i)
                : [...prev, {...item, count}]
            localStorage.setItem(key, JSON.stringify(newCart))
            return newCart
        })
    }, [])

    const removeFromCart = useCallback((item_id) => {
        setCart(prev => {
            const newCart = prev.filter(i => i._id !== item_id)
            localStorage.setItem(key, JSON.stringify(newCart))
            return newCart
        })
    }, [])

    const incrementItem = useCallback((item_id) => {
        setCart(prev => {
            const newCart = prev.map(i => i._id === item_id ? {...i, count: i.count+1} : i)
            localStorage.setItem(key, JSON.stringify(newCart))
            return newCart
        })
    }, [])

    const decrementItem = useCallback((item_id) => {
        setCart(prev => {
            const foundItem = prev.find(i => i._id === item_id)
            if(!foundItem){
                return prev
            }
            const newCart = foundItem.count === 1
                ? prev.filter(i => i._id !== item_id)
                : prev.map(i => i._id === item_id ? {...i, count: i.count-1} : i) 
            localStorage.setItem(key, JSON.stringify(newCart))
            return newCart
        })
    }, [])

    return <CartContext.Provider value={{cart, addToCart, removeFromCart, incrementItem, decrementItem}}>
        {children}
    </CartContext.Provider>
}