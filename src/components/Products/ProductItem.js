import React from 'react'
import classes from './ProductItem.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
const ProductItem = (props) => {

    const { product } = props;

    const onEditClick = (id) => {
        props.onEdit(id)
    }

    const onDeleteClick = (id) => {
        props.onDelete(id)
    }

    return (
        <>
            <div className='d-flex bg-white shadow mb-3 p-4 align-items-center rounded-3'>
                <div className='col-md-2'>
                    <div className={classes['image-container']}>
                        {
                            (!product?.images?.[0].includes('http') || product?.images?.[0]?.includes('any')) ?
                                (
                                    null
                                ) :
                                (
                                    <img src={product?.images?.[0]} alt='product' />
                                )
                        }
                    </div>
                </div>
                <div className='col-md-5'>
                    <p className='fw-bold'>{product?.title}</p>
                    <p className='text-secondary'>{product?.description}</p>
                </div>
                <div className='col-md-2 text-center'>
                    <span className="badge text-bg-primary">{product?.category?.name}</span>
                </div>
                <div className='col-md-2 text-center'>
                    <span className='fw-bold'>$ {product?.price}</span>
                </div>
                <div className='col-md-1 text-center'>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                            Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => onEditClick(product?.id)}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => onDeleteClick(product?.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default ProductItem