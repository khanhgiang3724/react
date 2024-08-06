import React, { createContext, useEffect, useState } from 'react'
import { CartItem } from '../interfaces/cart'
import instance from '../apis'

type Props = {
    children: React.ReactNode
}

interface ShoppingContextType {
    cartItems: CartItem[]
    cartQty: number
    addCartItem: (item: CartItem) => void // Thay đổi ở đây
    removeCartItem: (id: number | string) => void
    updateQuantity: (name: string, quantity: number) => void
    clearCart: () => void
}

export const CartContextCT = createContext<ShoppingContextType>({} as ShoppingContextType)

const CartContext = ({ children }: Props) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

        useEffect(() => {
            (async () => {
                const {data} = await instance.get(`carts`)
                setCartItems(data)
            })()
        },[])

    const cartQty = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)
    const addCartItem = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(cartItem => cartItem.name === item.name)
            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex].quantity += item.quantity
                return updatedItems
            } else {
                return [...prevItems, item]
            }
        })
    }

    const updateQuantity = async (name: string, quantity: number) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === name)
        if (existingItem) {
            const updatedItem = { ...existingItem, quantity }
            await instance.patch(`carts/${existingItem.id}`, { quantity: updatedItem.quantity })
            setCartItems(prevItems => prevItems.map(cartItem => cartItem.id === existingItem.id ? updatedItem : cartItem))
        }
    }

    const removeCartItem = (id: number | string) => {
        (async () => {
            if(confirm("Bạn có muốn xóa không?")) {
                await instance.delete(`carts/${id}`)
                setCartItems(cartItems.filter((item) => item.id !== id && id ))
                alert("Xóa thành công")
            }
            
        })()
    }
    const clearCart = () => {
        setCartItems([]);
    };
    return (
        <CartContextCT.Provider value={{ cartItems, updateQuantity, addCartItem, removeCartItem ,cartQty,clearCart}}>
            {children}
        </CartContextCT.Provider>
    )
}

export default CartContext
