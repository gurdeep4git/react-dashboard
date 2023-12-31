import React, { useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const credentials = {
            email,
            password
        }
        const response = await loginUser(credentials);
        setToken(response?.data?.access_token);
        navigate("/dashboard/products")
        setIsLoading(false);

    }

    const loginUser = async (credentials) => {
        const url = `https://api.escuelajs.co/api/v1/auth/login`;
        return axios.post(url, credentials);
    }

    return (
        <div className="card shadow" style={loginCard}>
            <div className="card-body">
                <h3 className='text-center mb-4'>Sign in</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailControl" className="form-label">Email address</label>
                        <input defaultValue={'admin@mail.com'} ref={emailRef} type="email" className="form-control" id="emailControl" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordControl" className="form-label">Password</label>
                        <input defaultValue={'admin123'} ref={passwordRef} type="password" className="form-control" id="passwordControl" />
                    </div>
                    <div className="mb-3 d-flex justify-content-end">
                        {
                            isLoading ? (<button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>)
                                : (<button type="submit" className="btn btn-primary">Login</button>)
                        }



                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login