import React, { useEffect, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import ProductItem from './ProductItem';
import PageTitle from '../PageTitle/PageTitle';
import axios from 'axios';

const Products = () => {

    const { response: productsData, loading: productsLoading, error: ProductsError } = useAxios({
        method: `GET`,
        url: `https://api.escuelajs.co/api/v1/products`,
    })

    const { response: categoriesData, loading: categoriesLoading, error: categoriesError } = useAxios({
        method: `GET`,
        url: `https://api.escuelajs.co/api/v1/categories`,
    })

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
        if (categoriesData) {
            setCategories(categoriesData);
        }
    }, [productsData, categoriesData])

    const onCategoryChange = async (e) => {
        const categoryId = e.target.value;
        try {
            const response = await getProductsByCategory(categoryId);
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }

    }

    const getProductsByCategory = (categoryId) => {
        return axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
    }

    return (
        <>
            <PageTitle title='Products' />

            <section>
                <select onChange={onCategoryChange}>
                    <option value=''>--Select--</option>
                    {
                        categories?.map((category) => {
                            return <option key={category?.id} value={category?.id}>{category?.name}</option>
                        })
                    }
                </select>
            </section>

            <section>
                {
                    productsLoading ?
                        (<p>Loading...</p>) :
                        (
                            <>
                                {ProductsError && (<p>{ProductsError}</p>)}
                                <div>
                                    {products?.length && products?.map((product) => {
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