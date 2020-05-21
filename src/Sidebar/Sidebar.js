import React from "react";
import FolderList from "./FolderList";
import UserContext from '../ContextProvider';
import { NavLink } from "react-router-dom";

export default function Sidebar(props) {
  return (
    <UserContext.Consumer>
      {({ AddFolder }) => (
        <section className="sidebar">
          <FolderList />
       <NavLink to="/add-folder">
      <button className="Add-folder"> 
              Add Folder
      </button>
      </NavLink> 
        </section>
      )}
    </UserContext.Consumer>
  );
}



{/* <NavLink className='add-folder' to={'/add-folder'}>      
Add Form
</NavLink> */}