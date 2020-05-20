import React from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import UserContext from '../ContextProvider';


export default function Note(props) {
    console.log(props)
    const {id, name, modified, content} = props.note
    return (
        <div className='noteItem' key={id} >
                    <NavLink className='navlink note-name' to={'/note/' + id}>{name} </NavLink>
            <p className='date'>{`Date modified on ${moment(modified).format('MMM D YYYY')}`}</p>
            <button className='delete-note'>Delete Note</button>
            {props.showDescription ? (<p>{content}</p>): ''}
            </div>
    )
        
}



// // import React from 'react';
// import { NavLink } from 'react-router-dom';
// import moment from 'moment';
// import UserContext from '../ContextProvider';
// import Note from './Note'

// export default function NoteList(props) {
//     console.log(props)
//     return(
//         <UserContext.Consumer>
//         {({folders, notes}) => (
//         <section>
//                 {notes.filter(
//                     (note) => {
//                         if (props.folderId === undefined) {
//                             return true
//                         }
//                  return note.folderId === props.folderId
                 
//                     }).map(note => <Note note={note} showDescription={props.showDescription}/>
            
//             )}
//             <button className="Add-note">Add Note</button>
     
//         </section>
           
//            )}   
           
//         </UserContext.Consumer>
     
//     )
// }