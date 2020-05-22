import React from "react";
import FolderList from "./FolderList";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
        <section className="sidebar">
          <FolderList />
       <NavLink to="/add-folder">
      <button className="Add-folder"> 
              Add Folder
      </button>
      </NavLink> 
        </section>
      
  );
}



{/* <NavLink className='add-folder' to={'/add-folder'}>      
Add Form
</NavLink> */}