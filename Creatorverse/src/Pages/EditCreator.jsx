import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../Client';
import '../CSS/EditCreator.css';

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("Post")
          .select("*")
          .eq("id", id)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error("Creator not found");

        setFormData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching creator:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCreator();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      // Basic validation
      if (!formData.name.trim() || !formData.description.trim()) {
        throw new Error("Name and description are required");
      }

      const { error: updateError } = await supabase
        .from("Post")
        .update({
          name: formData.name.trim(),
          description: formData.description.trim(),
          url: formData.url.trim()
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Navigate back to the creator's page
      navigate(`/creators/${id}`);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="edit-creator">
      <div className="form-header">
        <h1>Edit Creator</h1>
        <button 
          onClick={() => navigate(`/creators/${id}`)} 
          className="btn btn-secondary"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Name: *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter creator's name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description: *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter creator's description"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Website URL:</label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url || ""}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com"
          />
        </div>

    

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
