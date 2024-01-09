import React, { useRef } from 'react'
import { Button } from 'react-bootstrap';
import { CartState } from '../../context/CartContext';
import { ADD_TO_CART, REMOVE_FROM_CART_MINUS } from '../../constants/url';

const CartItem = (props) => {
    const { product } = props;
    const { dispatch } = CartState();
    const addToCart = () => {
        const addedProduct = {
            ...product,
            quantity: Number(product?.quantity + 1)
        }
        dispatch({ type: ADD_TO_CART, payload: addedProduct })
    }

    const deleteFromCart = () => {
        dispatch({ type: REMOVE_FROM_CART_MINUS, payload: product })
    }

    return (
        <div>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product?.images?.[0]} className="img-fluid rounded-start" alt={product?.title} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product?.title}</h5>
                            <h6 className="card-text">Price: ${product?.price}</h6>
                            <p className="card-text">Quantity: {product?.quantity}</p>
                            <div className="input-group mb-3">
                                <button onClick={deleteFromCart} className="btn btn-outline-secondary" type="button" id="button-addon1">-</button>
                                <input readOnly value={product?.quantity} type="text" className="form-control" />
                                <button onClick={addToCart} className="btn btn-outline-secondary" type="button" id="button-addon2">+</button>
                            </div>
                            <Button variant='danger' onClick={() => props.removeFromCart(product?.id)}>Remove</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem