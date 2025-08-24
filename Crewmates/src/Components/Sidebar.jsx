import React from "react";
import { Link } from "react-router";
import '../Style_CSS/SideBar.css';



const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <ul>
        <li>
            
            <Link to="/createCrew">
              <button className="create-button">Create Crew</button>
            </Link>
        </li>
        <li>
          <Link to="/stats">
            <button className="manage-button">Crew Stats</button>
          </Link>
        </li>
        <li>
          <Link to="/viewCrew">
            <button className="view-button">View Crew built</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
