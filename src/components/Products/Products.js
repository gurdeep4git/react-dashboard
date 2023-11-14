import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import ProductItem from './ProductItem';
import PageTitle from '../PageTitle/PageTitle';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

const Products = () => {

    const { response: productsData, loading: productsLoading, error: ProductsError } = useAxios({
        method: `GET`,
        url: `https://api.escuelajs.co/api/v1/products`,
    })

    const { response: categoriesData, loading: categoriesLoading, error: categoriesError } = useAxios({
        method: `GET`,
        url: `https://api.escuelajs.co/api/v1/categories`,
    })

    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [searchTitle, setSearchTitle] = useState('');
    const [searchTitleTouched, setSearchTitleTouched] = useState(false);

    useEffect(() => {
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [categoriesData])

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
            setLoading(productsLoading);
        }
    }, [productsData])

    const onCategoryChange = async (e) => {
        const categoryId = e.target.value;
        try {
            setLoading(true);
            const response = await getProductsByCategory(categoryId);
            setProducts(response?.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    const getProductsByCategory = (categoryId) => {
        if (Number(categoryId) === 0) {
            return axios.get(`https://api.escuelajs.co/api/v1/products`);
        }

        return axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
    }

    useEffect(() => {
        if (searchTitle?.length || searchTitleTouched) {
            const getProductsBySearchTitle = setTimeout(async () => {
                try {
                    setLoading(true);
                    const response = await getProductsBySearch();
                    setProducts(response?.data);
                } catch (error) {
                    console.error(error)
                } finally {
                    setLoading(false)
                }
            }, 3000)
            return () => clearTimeout(getProductsBySearchTitle);
        }
    }, [searchTitle])

    const handleSearch = (e) => {
        setSearchTitle(e.target.value);
        setSearchTitleTouched(true);
    }

    const getProductsBySearch = () => {
        return axios.get(`https://api.escuelajs.co/api/v1/products/?title=${searchTitle}`)
    }

    return (
        <>
            <PageTitle title='Products' />

            <section className='mb-4'>
                <div className="d-flex justify-content-end row">
                    <div className="col-md-3">
                        <input onChange={handleSearch} type="text" className="form-control" id="search" placeholder="Search by title" />
                    </div>
                    <div className="col-md-3">
                        <div>
                            <select className="form-control" id="categoryFilter" onChange={onCategoryChange}>
                                <option value='0'>Select category</option>
                                {
                                    categories?.map((category) => {
                                        return <option key={category?.id} value={category?.id}>{category?.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                </div>

            </section>

            <section>
                {
                    isLoading ?
                        (<Spinner />) :
                        (
                            <>
                                {ProductsError && (<p>{ProductsError}</p>)}
                                <div>
                                    {products?.map((product) => {
                                        return <ProductItem key={product?.id} product={product} />
                                    })}
                                </div>
                            </>
                        )
                }
            </section>
        </>
    )
}

export default Products