import React, { useState, useEffect } from "react";
import defaultAvatar from '../assets/20250731_0212_User Profile Image_simple_compose_01k1fhqc40eybs2dd0e3zbjejc.png';
import '../CSS_Styles/ForumPost.css';
import supabase from "../Client";
import { useNavigate, Link } from 'react-router';
import { useParams } from 'react-router';

const ForumPost = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});

  // Fetch posts once on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("Post")
          .select(`
            id, 
            Post_Title, 
            Post_text, 
            created_at, 
            likes_count, 
            reply_count,
            Reply 
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        // Ensure Reply is always an array
        const postsWithArrayReplies = data.map(post => ({
          ...post,
          Reply: Array.isArray(post.Reply) ? post.Reply : []
        }));
        setPosts(postsWithArrayReplies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Like handler
  const handleLike = async (post) => {
    const newLikeCount = (post.likes_count || 0) + 1;
    const { error } = await supabase
      .from("Post")
      .update({ likes_count: newLikeCount })
      .eq("id", post.id);

    if (error) {
      console.error("Error updating like count:", error);
    } else {
      setPosts(posts.map(p =>
        p.id === post.id
          ? { ...p, likes_count: newLikeCount }
          : p
      ));
    }
  };

  // Reply handler
  const handleReply_likes = async (post) => {
    const newReplyCount = (post.reply_count || 0) + 1;
    const { error } = await supabase
      .from("Post")
      .update({ reply_count: newReplyCount })
      .eq("id", post.id);

    if (error) {
      console.error("Error updating reply count:", error);
    } else {
      setPosts(posts.map(p =>
        p.id === post.id
          ? { ...p, reply_count: newReplyCount }
          : p
      ));
    }
  };
   // Reply text handler
   const handleReply_text = async (post) => {
    const replyText = replyTexts[post.id];
    if (!replyText?.trim()) {
      alert("Reply text cannot be empty");
      return;
    }

    const { data, error } = await supabase
      .from("Post")
      .update({ reply_text: replyText })
      .eq("id", post.id);

    if (error) {
      console.error("Error adding reply:", error);
    } else {
      // Update the posts state with the new reply
      setPosts(posts.map(p =>
        p.id === post.id
          ? { 
              ...p, 
              Reply: [...(p.Reply || []), data[0]]
            }
          : p
      ));
      // Clear the reply text for this post
      setReplyTexts(prev => ({
        ...prev,
        [post.id]: ''
      }));
    }
  };


  

  return (
    <div className="chat-forum">
      <h2>BiteForum</h2>

      <div className="new-post-form">
        <Link to="/chat" className="new-post-link">
          <button className="new-post-button">Create New Post</button>
        </Link>
      </div>

      {/* Posts List */}
      <div className="chat-messages">
        {loading
          ? <p>Loading posts...</p>
          : error
            ? <p>Error: {error}</p>
            : posts.map(post => (
              <div 
                key={post.id} 
                className="message">
                <img
                  src={defaultAvatar}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <Link to={`/PostChat/${post.id}`}>
                  <h3>{post.Post_Title}</h3>
                </Link>
                <p>{post.Post_text}</p>
               
                <div className="post-actions">
                  <button onClick={() => handleLike(post)}>
                    👍 Likes ({post.likes_count || 0})
                  </button>
                  <button onClick={() => handleReply_likes(post)}>
                    💬 Replies ({post.reply_count || 0})
                  </button>
                </div>
                <span className="post-time">
                  {new Date(post.created_at).toLocaleString()}
                </span>
                <div className="replies">
                    <textarea
                      value={replyTexts[post.id] || ''}
                      onChange={(e) => setReplyTexts(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))}
                      placeholder="Write a reply..."
                    />
                    <button onClick={() => handleReply_text(post)}>Reply</button>   
                  {Array.isArray(post.Reply) && post.Reply.map(Reply => (
                    <div key={Reply.id} className="reply">
                      <p>{Reply.reply_text}</p>
                      <span className="reply-time">
                        {Reply.created_at && new Date(Reply.created_at).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default ForumPost;

