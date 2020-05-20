import React, { useReducer } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
import Note from './Note';
import UserContext from '../ContextProvider';



export default function MainRoute(props) {
    console.log(props)
    return(
        
        <section className="main">
            <Note showDescription={props.showDescription}
            folderId={props.folderId}
            />    
        </section> 
      
    )
}

// 