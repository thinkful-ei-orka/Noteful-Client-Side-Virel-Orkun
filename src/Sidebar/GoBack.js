import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';



export default function GoBack(props) {
    return (
        <div>
            <NavLink to='/'>
                <button className="go-back">Go back!</button>
            </NavLink>
            <h2>{props.folderName}</h2>
        </div>
    )
}