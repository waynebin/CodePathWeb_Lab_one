// src/Components/EditPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }    from 'react-router';
import { Container, Form, Button }   from 'react-bootstrap';
import supabase  from '../Client';

export default function EditPostPage() {
  const { postId } = useParams();
  const navigate   = useNavigate();

  const [title,    setTitle]    = useState('');
  const [text,     setText]     = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  // 1️⃣ Load existing post data
  useEffect(() => {
    const loadPost = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('Post')
        .select('Post_Title, Post_text, image_url, user_id')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error loading post:', error);
        alert('Could not load post.');
        navigate(-1);
      } else if (!user || data.user_id !== user.id) {
        alert('You are not authorized to edit this post.');
        navigate(-1);
      }
      else {
        setTitle(data.Post_Title);
        setText(data.Post_text);
        setImageUrl(data.image_url || '');
      }
      setLoading(false);
    };

    loadPost();
  }, [postId, navigate]);

  // 2️⃣ Handle save
  const handleSave = async () => {
    setSaving(true);

    const updates = {
      Post_Title: title,
      Post_text:  text,
      image_url:  imageUrl || null
    };

    const { error } = await supabase
      .from('Post')
      .update(updates)
      .eq('id', postId);

    setSaving(false);

    if (error) {
      console.error('Error saving post:', error);
      alert('Failed to save changes.');
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <p>Loading post…</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h2>Edit Post</h2>

      <Form>
        <Form.Group className="mb-3" controlId="postTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postText">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your post content here…"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="postImage">
          <Form.Label>Image URL (optional)</Form.Label>
          <Form.Control
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </Form.Group>

        <div className="d-flex">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate(-1)}
            disabled={saving}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}