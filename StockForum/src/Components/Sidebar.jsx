import React from "react";
import { Link } from 'react-router';
import '../CSS_Styles/SideBar.css'; // Assuming you have a CSS file for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Stock Categories</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/trending">Trending</Link></li>
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/chat">Chat</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
