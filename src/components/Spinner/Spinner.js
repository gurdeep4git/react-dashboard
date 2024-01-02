import React from 'react'
import classes from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={classes['spinner-container']}>
            <div className={`${classes['spinner-size']} spinner-border`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner