import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../ContextProvider';
import './Note.css';
import PropTypes from 'prop-types';


export default function Note(props) {
    console.log(props.note)

    return (
        <UserContext.Consumer>
            {({ deleteNote }) => (
                <section>
                    {props.note.filter(
                        (note) => {
                            if (props.folderId === undefined) {
                                return true
                            }
                            return note.folderid === props.folderId
                            
                        }).map(note =>
                            <div className='noteItem' key={note.id} >
                                <NavLink className='navlink note-name' to={'/note/' + note.id}>{note.title}</NavLink>
                                <p className='date'>{`Date modified on ${moment(note.modified).format('MMM D YYYY')}`}</p>
                                <button onClick={() => {
                                    props.location.pathname = '/'
                                    deleteNote(note.id)
                                }}

                                    className='delete-note'>Delete Note</button>
                                {console.log(note)}
                                {props.showDescription ? (<p>{note.content}</p>) : ''}
                            </div>

                        )}

                </section>
            )}
        </UserContext.Consumer>
    )
}

Note.propTypes = {
    note: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    showDescription: PropTypes.bool.isRequired
};