import { useState } from 'react'

const useToken = () => {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const [token, setToken] = useState(getToken());
    const saveToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        setToken(token)
    }

    const clearToken = () => {
        localStorage.setItem('token', null);
    }



    return {
        setToken: saveToken,
        clearToken,
        token
    }


}

export default useToken