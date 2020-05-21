import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../ContextProvider';


export default function Note(props) {
    console.log(props)
    const {id, name, modified, content} = props.note
    return (
        <UserContext.Consumer>
        {({folders, notes}) => (
        <section>
                {props.note.filter(
                    (note) => {
                        if (props.folderId === undefined) {
                            return true
                        }
                 return note.folderId === props.folderId
                 
                 }).map(note => 
            <div className='noteItem' key={note.id} >
                    <NavLink className='navlink note-name' to={'/note/' + note.id}>{note.name}</NavLink>
            <p className='date'>{`Date modified on ${moment(note.modified).format('MMM D YYYY')}`}</p>
            <button className='delete-note'>Delete Note</button>
            {props.showDescription ? (<p>{note.content}</p>): ''}
            </div>
            
            )}

        </section>
          )}   
        </UserContext.Consumer>
    )
}