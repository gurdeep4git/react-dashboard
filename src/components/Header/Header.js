import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import classes from './Header.module.css';
import useToken from '../../hooks/useToken';
import { Link, useNavigate } from "react-router-dom";
import { URL } from '../../constants/url';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { CartState } from '../../context/CartContext';

const Header = () => {
    const navigate = useNavigate();
    const { token, clearToken } = useToken();
    const [user, setUser] = useState();
    const buttonRef = useRef();
    const { state: { cart } } = CartState();

    const cartCount = cart.reduce((acc, curr) => {
        return acc = acc + curr.quantity
    }, 0)

    useEffect(() => {
        let element
        if (cart.length) {
            element = buttonRef.current
            element.classList.add(`${classes.bounce}`);

            setTimeout(() => element.classList.remove(`${classes.bounce}`), 1000);
        }
    }, [cart])

    useEffect(() => {
        async function getUserDetails(token) {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setUser(response?.data);
                console.log('user', response.data)
            }
            catch (e) {
                console.error(e);
            }
        }

        if (token) {
            getUserDetails(token)
        }

    }, [token])

    const onLogout = () => {
        clearToken()
        navigate(URL.LOGIN)
    }

    return (
        <div className='d-flex p-3 border-bottom justify-content-end align-items-center bg-white'>
            <div>
                <div className='d-flex align-items-center'>
                    <div className={classes['image-container']}>
                        <img src={user?.avatar} alt={user?.name} />
                    </div>
                    <div>
                        <b className='d-block'>{user?.name}</b>
                        <span className='d-block text-secondary'>{user?.email}</span>
                    </div>
                </div>
            </div>
            <div className='mx-4 text-secondary'> | </div>
            <div>
                <span onClick={onLogout}>logout</span>
            </div>
            <div className='mx-4 text-secondary'> | </div>
            <Link to='./cart'>
                <Button ref={buttonRef} variant="primary">
                    Cart <Badge bg="secondary">{cartCount}</Badge>
                    <span className="visually-hidden">cart items</span>
                </Button>
            </Link>
        </div>
    )
}

export default Header