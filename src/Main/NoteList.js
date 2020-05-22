import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../ContextProvider';
import PropTypes from 'prop-types';


export default function NoteList(props) {
    console.log(props)
    return (
        <UserContext.Consumer>
            {({ notes, deleteNote }) => (
                <section>
                    {notes.filter(
                        (note) => {
                            if (props.folderId === undefined) {
                                return true
                            }
                            return note.folderId === props.folderId

                        }).map(note =>
                            <div className='noteItem' key={note.id} >
                                <NavLink className='navlink note-name' to={'/note/' + note.id}>{note.name}</NavLink>
                                <p className='date'>{`Date modified on ${moment(note.modified).format('MMM D YYYY')}`}</p>
                                <button
                                    onClick={() => {
                                        props.location.pathname = '/'
                                        deleteNote(note.id)
                                    }}
                                    className='delete-note'>Delete Note</button>
                                {props.showDescription ? (<p>{note.content}</p>) : ''}
                            </div>

                        )}
                    <NavLink to="/add-note">
                        <button className="Add-note">Add Note</button>
                    </NavLink>

                </section>
            )}
        </UserContext.Consumer>
    )
}

NoteList.propTypes = {
    folderId: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    showDescription: PropTypes.bool.isRequired
};