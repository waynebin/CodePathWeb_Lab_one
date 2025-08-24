import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Client";
import '../CSS/AddCreator.css';

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // Basic validation
    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Name and description are required");
      setLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from('Post')
        .insert([{
          name: formData.name.trim(),
          description: formData.description.trim(),
          url: formData.url.trim(),
          
        }])
        .select()
        .single();

      if (supabaseError) throw supabaseError;

      // Navigate to the creator's page after successful addition
      navigate(`/creators/${data.id}`);
    } catch (err) {
      setError(err.message || "Failed to add creator");
      setLoading(false);
    }
  };

  return (
    <div className="add-creator">
      <div className="form-header">
        <h1>Add New Creator</h1>
        <button 
          onClick={() => navigate('/creators')} 
          className="btn btn-secondary"
        >
          Back to List
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
            value={formData.url}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com"
          />
        </div>



        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Creator"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
