import axios from 'axios'
import React, { useEffect, useState } from 'react'
import classes from './Header.module.css';
import useToken from '../../hooks/useToken';
import { useNavigate } from "react-router-dom";
import { URL } from '../../constants/url';

const Header = () => {
    const navigate = useNavigate();
    const { token, clearToken } = useToken();
    const [user, setUser] = useState();

    useEffect(() => {
        async function getUserDetails(token) {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`,
                    { headers: { "Authorization": `Bearer ${token}` } })
                setUser(response?.data);
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
        <div className='d-flex p-3 border-bottom justify-content-end align-items-center'>
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
        </div>
    )
}

export default Header