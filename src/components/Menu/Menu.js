import React from 'react'
import { NavLink } from "react-router-dom";
import classes from './Menu.module.css'

const Menu = () => {
    return (
        <div className={`text-bg-dark ${classes.menu}`}>
            <h2 className={`${classes.logo} py-4`}><span className='text-danger'>R</span>-Dashboard</h2>
            <div>
                <ul>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? `${classes.active}` : 'none')} to="./products">Products</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? `${classes.active}` : 'none')} to="./profile">Profile</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu