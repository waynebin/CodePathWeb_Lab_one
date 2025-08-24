import React from "react";
import { useState } from 'react'
import '../CSS_Styles/ChatForum.css'; // Assuming you have a CSS file for styling
import userProfileImage from '../assets/20250731_0212_User Profile Image_simple_compose_01k1fhqc40eybs2dd0e3zbjejc.png';
import { Link, useNavigate } from 'react-router';
import supabase from "../Client";

// create a functional component for the chat forum
/* this component will handle the chat functionality have an image for the user profile,
    display chat messages, and allow users to send messages, number of likes, and replies.
*/

const ChatForum = () => {
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [likes, setLikes] = useState(0);
    const [replies, setReplies] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "" || postText.trim() === "") {
            alert("Title and post text cannot be empty");
            return;
        }

        try {
            const { error } = await supabase
                .from("Post")
                .insert([{
                    Post_Title: title,
                    Post_text: postText,
                    
                }]);

            if (error) {
                console.error("Error creating post:", error);
                alert("Failed to create post. Please try again.");
                return;
            }

            // Reset form after successful submission
            setTitle('');
            setPostText('');
            setImageUrl('');
            setMessages([...messages, { title, text: postText, imageUrl }]);
            alert("Post created successfully!");
        } catch (err) {
            console.error("Error:", err);
            alert("An unexpected error occurred. Please try again.");
        }
    };
  
    return (
        <div className="chat-forum">
            <h2>BiteChat</h2>
            <div className="chat-messages">
               
                
                <div className="chat-input">
                    <form onSubmit={handleSubmit}>
                        <img src={userProfileImage} alt="User Profile" className="user-profile-image"/>
                        <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                        <label className="post-title">Title:
                            <input 
                                type="text" 
                                placeholder="Make a bite" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <textarea 
                            placeholder="Type your post here..."
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        ></textarea>
                        <label>Image Url:
                            <input 
                                type="url" 
                                accept="image/*" 
                                placeholder="Optional Image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </label>
                        <button type="submit">Bite</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatForum;