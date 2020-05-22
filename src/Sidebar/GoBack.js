import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';



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

GoBack.propTypes = {
    folderName: PropTypes.string
  };