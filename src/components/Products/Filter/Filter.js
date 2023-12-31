import React, { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

const Filter = (props) => {

    const [filter, setFilter] = useState();

    useEffect(() => {
        setFilter((prevState) => {
            return {
                ...prevState,
                title: props.filter.title,
                category: props.filter.category,
                priceMin: props.filter.priceMin,
                priceMax: props.filter.priceMa,
            }
        })
    }, [props.filter])

    const OnInputChange = (e) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value.trim()
            }
        })
    }

    const onSubmitHandler = () => {
        props.onSubmit(filter);
    }

    return (
        <>
            <Offcanvas placement='end' show={props.show} onHide={props.onHide}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="titleFilter" className="form-label">Title</label>
                            <input name='title' onChange={OnInputChange} type="text" value={filter?.title} className="form-control" id="titleFilter" placeholder="Search by title" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="categoryFilter" className="form-label">Categories</label>
                            <select name='category' onChange={OnInputChange} value={filter?.category} className="form-control" id="categoryFilter">
                                <option value='0'>Select category</option>
                                {
                                    props.categories?.map((category) => {
                                        return <option key={category?.id} value={category?.id}>{category?.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="priceMinFilter" className="form-label">Min Price</label>
                            <input name='priceMin' onChange={OnInputChange} value={filter?.priceMin} type="text" className="form-control" id="priceMinFilter" placeholder="Search by price" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="priceMaxFilter" className="form-label">Max Price</label>
                            <input name='priceMax' onChange={OnInputChange} value={filter?.priceMax} type="text" className="form-control" id="priceMaxFilter" placeholder="Search by price" />
                        </div>
                    </form>
                </Offcanvas.Body>
                <div className='p-3'>
                    <div className='d-flex justify-content-end'>
                        <button type="button" className="btn btn-outline-danger me-3">Reset</button>
                        <button onClick={onSubmitHandler} className="btn btn-primary" type="button">Submit</button>
                    </div>
                </div>
            </Offcanvas>
        </>
    )
}

export default Filter