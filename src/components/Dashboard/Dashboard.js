import React from 'react'
import useToken from '../../hooks/useToken';
import Header from '../Header/Header';
import Login from '../Login/Login';
import { Outlet } from "react-router-dom";
import Menu from '../Menu/Menu';

const Dashboard = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />
    }

    const mainStyle = {
        'height': 'calc(100vh - 88px)',
        'overflowY': 'auto',
        'padding': '22px',
        'background': '#f8f7f7'
    }

    return (
        <div className="container-fluid g-0">
            <div className="row g-0">
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <header>
                        <Header token={token} />
                    </header>
                    <main style={mainStyle}>
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard