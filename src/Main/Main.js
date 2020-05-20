import React, { useReducer } from 'react';
// import Sidebar from '../Sidebar/Sidebar';
import Note from './Note';



export default function MainRoute(props) {
    return(
        <UserContext.Consumer>
        {({folders, notes}) => (
        <section className="main">
            <Note showDescription={props.showDescription}/>    
        </section> 
        )}   
        </UserContext.Consumer>
    )
}