import React, { createContext, useContext, useReducer } from 'react'
import { cartReducer } from './CartReducer';

const Cart = createContext();

const CartContext = (props) => {

    const [state, dispatch] = useReducer(cartReducer, {
        cart: []
    })

    return (
        <Cart.Provider value={{ state, dispatch }}>{props.children}</Cart.Provider>
    )
}

export default CartContext;

export const CartState = () => {
    return useContext(Cart)
}