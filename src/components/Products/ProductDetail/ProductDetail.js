import React, { useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { CartState } from '../../../context/CartContext';
import { ADD_TO_CART } from '../../../constants/url';


const ProductDetail = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);
    const { dispatch } = CartState();
    const quantityRef = useRef()

    const getProductById = async (id) => {
        try {
            setIsLoading(true);
            const url = `https://api.escuelajs.co/api/v1/products/${id}`;
            const response = await axios.get(url);
            setProduct(response.data);
            console.log(response?.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getProductById(id)
    }, [id])

    const OPTIONS = [1, 2, 3, 4, 5];

    const addToCart = () => {
        const addedProduct = {
            ...product,
            quantity: Number(quantityRef.current.value)
        }
        dispatch({ type: ADD_TO_CART, payload: addedProduct })
    }

    return (
        <>
            {isLoading ? <Spinner /> : (
                <Container fluid>
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
                        <Col sm={4}>
                            <img className="img-fluid" src={product?.images?.[0]} alt={product?.title} />
                        </Col>
                        <Col sm={8}>
                            <h2>{product?.title}</h2>
                            <span className="my-3 badge rounded-pill bg-primary">{product?.category?.name}</span>
                            <h3>${product?.price}</h3>
                            <p className='text-secondary my-3'>{product?.description}</p>

                            <div className='my-3'>
                                <span className='text-secondary me-3'>Quantity</span>
                                <select ref={quantityRef} style={{ 'width': '50px' }}>
                                    {
                                        OPTIONS.map((i) => (<option key={i} value={i}>{i}</option>))
                                    }
                                </select>
                            </div>

                            <Button variant='primary' onClick={addToCart}>Add to cart</Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default ProductDetail