import React from 'react';
import FolderList from './FolderList';

export default function Sidebar(props) {
    return(
        <section className="sidebar">
            <FolderList />
            <button className='Add-folder'>Add Folder</button>
        </section>
    )
}