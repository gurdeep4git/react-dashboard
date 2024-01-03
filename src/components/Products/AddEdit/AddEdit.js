import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from '../../Spinner/Spinner';
import { ACTIONS } from '../../../constants/url';

const AddEdit = (props) => {

    const { productId, action } = props;

    const initialProduct = {
        "title": "",
        "price": 0,
        "description": "",
        "categoryId": 0,
        "images": ["https://placeimg.com/640/480/any"]
    }

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(initialProduct);

    const getProductById = async () => {
        try {
            setIsLoading(true);
            const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
            const response = await axios.get(url);
            setProduct(response.data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!!productId) {
            getProductById()
        }
    }, [productId])

    const onSubmitClick = () => {
        if (action === ACTIONS.EDIT) {
            const updatedProduct = {
                ...product,
                category: props.categories.find(i => i.id === Number(product.category))
            }
            props.addEditSubmit(updatedProduct);
        } else if (action === ACTIONS.ADD) {
            const updatedProduct = {
                ...product,
                categoryId: Number(product.category),
                price: Number(product.price)
            }
            delete updatedProduct.category;
            props.addEditSubmit(updatedProduct);
        }
    }

    const onCancelClick = () => {
        props.onHide();
    }

    const OnInputChange = (e) => {
        setProduct((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const canvasTitle = action === ACTIONS.ADD ? 'Add' : 'Edit';

    return (
        <>
            <Offcanvas placement='end' show={props.show} onHide={props.onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{canvasTitle} Product</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        isLoading ? (<Spinner />) : (
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="titleFilter" className="form-label">Title</label>
                                    <input name='title' onChange={OnInputChange} type="text" value={product?.title} className="form-control" id="titleFilter" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="categoryFilter" className="form-label">Categories</label>
                                    <select name='category' onChange={OnInputChange} value={product?.category?.id} className="form-control" id="categoryFilter">
                                        <option value='0'>Select category</option>
                                        {
                                            props.categories?.map((category) => {
                                                return <option key={category?.id} value={category?.id}>{category?.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input name='price' onChange={OnInputChange} value={product?.price} type="number" className="form-control" id="price" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea name='description' onChange={OnInputChange} value={product?.description} className="form-control" id="description"></textarea>
                                </div>
                            </form>
                        )
                    }

                </Offcanvas.Body>
                <div className='p-3'>
                    <div className='d-flex justify-content-end'>
                        <button type="button" className="btn btn-outline-danger me-3" onClick={onCancelClick}>Cancel</button>
                        <button onClick={onSubmitClick} className="btn btn-primary" type="button">Submit</button>
                    </div>
                </div>
            </Offcanvas>
        </>
    )
}

export default AddEdit