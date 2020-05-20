import React, { useReducer } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
import Note from './Note';
import UserContext from '../ContextProvider';



export default function MainRoute(props) {
    return(
        
        <section className="main">
            <Note/>    
        </section> 
      
    )
}

// showDescription={props.showDescription}