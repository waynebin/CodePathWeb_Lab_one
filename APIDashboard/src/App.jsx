import React from 'react';
import Sidebar from './Components/Sidebar';
import MainDisplay from './Components/MainDisplay';

import './CssStyle/App.css';

function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Dashboard</h1>
        <p>Welcome to the Stock Dashboard!</p>
      </header>

      {/*Sidebar display */}
      <div className="main-content">
        <div className="sidebar-container">
          <Sidebar />
        </div>

        <div className="content-area">
          {/* Main content will go here */}
          <MainDisplay />
        </div>
      </div>
    </div>
  )
}

export default App;
