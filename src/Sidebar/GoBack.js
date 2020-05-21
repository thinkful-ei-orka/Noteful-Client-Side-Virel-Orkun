import React from 'react';
import './Sidebar.css';



export default function GoBack(props) {
    return (
        <div>
            <button className="go-back">Go back!</button>
            <h2>{props.folderName}</h2>
        </div>
    )
}