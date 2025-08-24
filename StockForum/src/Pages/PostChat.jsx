// src/Components/PostChat.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }    from 'react-router';
import supabase                      from '../Client';
import { Container, Card, Button, Form } from 'react-bootstrap';

export default function PostChat() {
  const { postId } = useParams();
  const navigate     = useNavigate();
  const [post, setPost]       = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const user = supabase.auth.getUser();

  // 1) fetch post + replies create a async function so we can use await
  const fetchData = async () => {
    setLoading(true);
    try {
      // fetch the single post (including post id)
      const { data, error } = await supabase
        .from('Post')
        .select('id, Post_Title, Post_text,created_at, likes_count,Reply,reply_count')
        .eq('id', postId)// filter by postId
        .single()
        if (error) {
          alert('Could not load post.');
          throw error;
        }

      setPost(data);
      setReplies(data.replies || []);
    } catch (e) {
      console.error('Error fetching post:', e);
      alert('Could not load post.');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  // 2) upvote handler
  const handleUpvote = async () => {
    if (!post) return;

    const { error } = await supabase
      .from('Post')
      .update({ likes_count: (post.likes_count || 0) + 1 })
      .eq('id', postId);
    if (error) {
      console.error('Upvote error:', error);
    } else {
      // reflect immediately
      setPost(prev => ({ ...prev, likes_count: prev.likes_count + 1 }));
    }
  };

  // 3) add a new reply
  const handleAddReply = async () => {
    const text = replyText.trim();
    if (!text) return alert('Reply cannot be empty');

    const { data, error } = await supabase
      .from('Post')
      .insert([{ Reply: text }])
      .select()         // <-- need to select so data[0] is returned
      .single();
    if (error) {
      console.error('Error adding reply:', error);
    } else {
      setReplies(prev => [...prev, data]);
      setReplyText('');
    }
  };

  // 4) edit & delete (only for author)
  const handleEdit = () => {
    navigate(`/edit/${postId}`);
  };
  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    const { error } = await supabase
      .from('Post')
      .delete()
      .eq('id', postId);
    if (error) {
      console.error('Delete error:', error);
    } else {
      navigate('/');
    }
  };

  if (loading) return <Container className="mt-4"><p>Loading…</p></Container>;
  if (!post)  return <Container className="mt-4"><p>Post not found</p></Container>;

  return (
    <Container className="mt-4">
      <Button variant="link" onClick={() => navigate(-1)}>← Back</Button>

      <Card className="mt-2">
        <Card.Header>
          <h3>{post.Post_Title}</h3>
        </Card.Header>

        {post.image_url && (
          <Card.Img variant="top" src={post.image_url} alt="Post image" />
        )}

        <Card.Body>
          <Card.Text>{post.Post_text}</Card.Text>
        </Card.Body>

        <Card.Footer>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Posted on {new Date(post.created_at).toLocaleString()}
            </small>

            <div>
              <Button onClick={handleUpvote}>
                👍 Upvotes ({post.likes_count||0})
              </Button>

              {user?.id === post.user_id && (
                <>
                  <Button variant="warning" className="ms-2" onClick={handleEdit}>
                    ✏️ Edit
                  </Button>
                  <Button variant="danger" className="ms-2" onClick={handleDelete}>
                    🗑️ Delete
                  </Button>
                </>
              )}
            </div>
          </div>

          <hr/>

          <h5>Comments ({replies.length})</h5>

          {/* new reply */}
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Write a comment…"
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
          />
          <Button className="mt-2" onClick={handleAddReply}>
            Add Comment
          </Button>

          {/* list of replies */}
          {replies.map(r => (
            <Card key={r.id} className="mt-2">
              <Card.Body>
                <Card.Text>{r.reply_text}</Card.Text>
                <small className="text-muted">
                  {new Date(r.created_at).toLocaleString()}
                </small>
              </Card.Body>
            </Card>
          ))}
        </Card.Footer>
      </Card>
    </Container>
  );
}
