import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_CART_MINUS } from "../constants/url";

export const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const index = state.cart.findIndex((p) => p.id === action.payload.id);
            if (index > -1) {
                const updatedProduct = {
                    ...action.payload,
                    quantity: action.payload.quantity
                }

                const updatedCart = [...state.cart];
                updatedCart[index] = updatedProduct;

                return {
                    ...state,
                    cart: updatedCart
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((p) => p.id !== action?.payload)
            }
        }
        case REMOVE_FROM_CART_MINUS: {
            const index = state.cart.findIndex((p) => p.id === action?.payload?.id);
            if (index > -1) {
                if (action.payload.quantity <= 1) {
                    return {
                        ...state,
                        cart: state.cart.filter((p) => p.id !== action?.payload?.id)
                    }
                }
                else {
                    const newProduct = {
                        ...action.payload,
                        quantity: action.payload.quantity - 1
                    }
                    const productsCopy = [...state.cart];
                    productsCopy[index] = newProduct;
                    return {
                        ...state,
                        cart: productsCopy
                    }
                }
            }
        }


        default: return state;
    }
}