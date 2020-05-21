import React from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../ContextProvider';

export default function FolderList(props) {
    //We need only the notes that match the selected folder. Use filter.

    return(
        <UserContext.Consumer>
        {({folders, notes}) => (
        <section className="folder-list">
        {folders.map(folder=> 
            <div className='folder' key={folder.id}>
                <NavLink className='navlink' to={'/folder/' + folder.id} >{folder.name}</NavLink>
            </div>
            )}  
        </section>
         )}   
         </UserContext.Consumer>
    )
}