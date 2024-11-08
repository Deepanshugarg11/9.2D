import React from "react";
import { Outlet, Link } from "react-router-dom";
import './NavigationBar.css'; 
 

function NavigationBar() { 
    return (
        <div className="layout">
            <div className="navigation-bar">
                <Link className='link' to='/'>Deakin</Link>
                <input type="text" className="search-bar" placeholder="Search..." />
                <Link className='link' to='/post'>Post</Link>
                <Link className='link' to='/plans'>Plans</Link>
                <Link className='link' to='/login'>Login</Link>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default NavigationBar;