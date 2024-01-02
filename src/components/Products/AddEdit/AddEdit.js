import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from '../../Spinner/Spinner';

const AddEdit = (props) => {

    const { productId } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState(null);

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
        getProductById()
    }, [productId])

    const onSubmitClick = () => {
        const updatedProduct = {
            ...product,
            category: props.categories.find(i => i.id === Number(product.category))
        }
        props.addEditSubmit(updatedProduct)
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

    return (
        <>
            <Offcanvas placement='end' show={props.show} onHide={props.onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.title}</Offcanvas.Title>
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