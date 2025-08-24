import { useState } from 'react'
import React from 'react'
import './CSS_Styles/App.css'
import Sidebar from './Components/Sidebar'
import StockChart from './Components/StockChart'
import LogoImage from './assets/20250731_0335_Dinosaur Icon_remix_01k1fpaknqe4stpx59fakbve4w.png';
import ChatForum from './Components/ChatForum.jsx';
import ForumPost from './Components/ForumPost.jsx'
import Search from './Components/Search.jsx';
import supabase from "./Client";

const Orderby = () => {
  const [order, setOrder] = useState('asc'); // Default order is ascending
  return (
    <div>
      <button onClick={() => setOrder('asc')}>Sort Ascending</button>
      <button onClick={() => setOrder('desc')}>Sort Descending</button>
    </div>
  );
};

// Main App component that includes the header, sidebar, and main content area
function App() {
  // create a state variable to the upvotes and downvotes
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  
 
  return (
    <div className="app-container ">
        <div className="App-header">
          <img src={LogoImage} alt="Stock Forum Logo" className="logo-image" />
          {/* Header content with logo and title */}
          
          <h1>STOCKBITES</h1>
          <p>Share your thoughts and bites on the latest stock market trends!</p>

        </div>
        <div className="App-search-bar">
          <Search />
        </div>
        {/* App component is included here */}
        <div className="App-content">
          <Sidebar />
          <ForumPost likeCount={upvotes} replyCount={downvotes} />
          <StockChart />
        </div>
        {/* Main content area where other components can be added */}
        <div className="App-footer">
          <p>&copy; 2025 Stock Forum</p>
        </div>
  
    </div>
  );
}

export default App;
