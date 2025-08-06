import React from "react";
import { useState } from 'react'
import '../CSS_Styles/Post.css'; // Assuming you have a CSS file for styling
import ChatForum from "../Components/ChatForum";



// this will be the page where individual posts are displayed
const Post = () => {
  // create a state variable to store the post content
  const [postContent, setPostContent] = useState('');
  // create a state variable to store the comments
  const [comments, setComments] = useState([]);
  
  return (
    <div className="post-page">
        <h1>Post Your Bite</h1>
        <div className="post-content">
            {/* Display the post content here */}
            <p>{postContent}</p>
        </div>
        <div className="comments-section">
            
            {/* Display comments here */}
            {comments.map((comment, index) => (
            <div key={index} className="comment">
                <p>{comment}</p>
            </div>
            ))}
        </div>
        <ChatForum />
      
    </div>
  );
}

export default Post;
