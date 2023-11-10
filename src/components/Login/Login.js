import React, { useRef } from 'react';
import axios from "axios";

const Login = (props) => {

    const { setToken } = props;

    const emailRef = useRef();
    const passwordRef = useRef();

    const loginCard = {
        width: '400px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const credentials = {
            email,
            password
        }
        const response = await loginUser(credentials);
        setToken(response?.data?.access_token);
    }

    const loginUser = async (credentials) => {
        const url = `https://api.escuelajs.co/api/v1/auth/login`;
        return axios.post(url, credentials);
    }

    return (
        <div className="card" style={loginCard}>
            <div className="card-body">
                <h3 className='text-center mb-4'>Sign in</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailControl" className="form-label">Email address</label>
                        <input ref={emailRef} type="email" className="form-control" id="emailControl" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordControl" className="form-label">Password</label>
                        <input ref={passwordRef} type="password" className="form-control" id="passwordControl" />
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        <button type="submit" className="btn btn-info">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login