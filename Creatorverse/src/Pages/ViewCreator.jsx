import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../Client';
import '../CSS/ViewCreator.css';

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("Post")
          .select(`
            id,
            name,
            description,
            url
          `)
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching creator:", error);
          navigate('/creators');
        } else {
          setCreator(data);
        }
      } catch (error) {
        console.error("Error fetching creator:", error);
        navigate('/creators');
      }
    };

    if (id) {
      fetchCreator();
    }
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/creators/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('Post')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting creator:", error);
      } else {
        navigate('/creators');
      }
    } catch (error) {
      console.error("Error deleting creator:", error);
    }
  };

  if (!creator) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="view-creator">
      <div className="creator-header">
        <h1>{creator.name}</h1>
        <div className="creator-actions">
          <button onClick={() => navigate('/creators')} className="btn btn-secondary">
            Back to List
          </button>
          <button onClick={handleEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="creator-details">
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name} 
            className="creator-image"
          />
        )}
        <div className="creator-info">
          <h2>Description</h2>
          <p>{creator.description}</p>
          {creator.url && (
            <div className="creator-url">
              <h2>URL</h2>
              <a href={creator.url} target="_blank" rel="noopener noreferrer">
                {creator.url}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
