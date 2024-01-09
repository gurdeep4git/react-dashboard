import React from 'react'
import { CartState } from '../../context/CartContext'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import { REMOVE_FROM_CART } from '../../constants/url';

const Cart = () => {

    const { state: { cart }, dispatch } = CartState();

    const removeFromCartHandler = (id) => {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
    }

    const total = cart?.reduce((acc, curr) => {
        const subPrice = curr.price * curr.quantity;
        return acc = acc + subPrice;
    }, 0)

    const cartCount = cart.reduce((acc, curr) => {
        return acc = acc + curr.quantity
    }, 0)
    return (
        <>
            <Container fluid>

                {cart?.length ? (
                    <>
                        <Row className='mb-4'>
                            <Col>
                                <Link to="../products">
                                    <Button variant="secondary">
                                        <ArrowLeft className='me-1' />
                                        Back
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                {
                                    cart?.map((item) => {
                                        return <CartItem product={item} key={item?.id} removeFromCart={removeFromCartHandler} />
                                    })
                                }
                            </Col>
                            <Col md={4}>
                                <div className="p-3 mb-2 bg-secondary text-white">
                                    <h2>Subtotal {cartCount} items</h2>
                                    <h4>Total: ${total}</h4>
                                </div>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <div className={classes['empty-card']}>
                            <h2 className='mb-3'>Your cart is empty</h2>
                            <Link to="../products">
                                <Button variant="primary">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </>
                )}



            </Container>


        </>
    )
}

export default Cart