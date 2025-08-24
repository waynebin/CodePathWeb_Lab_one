import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../Client';
import CreatorCard from '../Components/CreatorCard';
import '../CSS/ShowCreators.css';

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/creators/${id}/edit`);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this creator?");
    if (confirmDelete) {
      const { error } = await supabase
        .from("Post")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting creator:", error);
      } else {
        setCreators(creators.filter(creator => creator.id !== id));
      }
    }
  };

  // Fetch creators once on mount
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase
          .from("Post")
          .select(`
            id,
            name,
            description,
            url
          `)
          if (error) {
            console.error("Error fetching creators:", error)
          } else {
            setCreators(data)
          }
      } catch (error) {
        console.error("Error fetching creators:", error)
      }
    }

    fetchCreators()
  }, [])

  return (
    <div className="creators-container">
      <h1 className="page-title">Creators List</h1>
      <div className="creators-grid">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowCreators;
