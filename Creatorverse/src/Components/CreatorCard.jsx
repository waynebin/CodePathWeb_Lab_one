import React from "react";
import { useNavigate } from "react-router-dom";

const CreatorCard = ({ creator, onEdit, onDelete }) => {
  const { id, name, description, url } = creator || {};
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on buttons or links
    if (
      e.target.tagName === 'BUTTON' || 
      e.target.tagName === 'A' ||
      e.target.closest('.creator-actions')
    ) {
      return;
    }
    navigate(`/creators/${id}`);
  };

  return (
    <div className="creator-card" onClick={handleCardClick}>
      <div className="creator-content">
        <h2>{name}</h2>
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="creator-url"
            onClick={(e) => e.stopPropagation()}
          >
            {url}
          </a>
        )}
        <p className="creator-description">{description}</p>
      </div>
      <div className="creator-actions" onClick={(e) => e.stopPropagation()}>
        <button 
          className="btn btn-edit" 
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button 
          className="btn btn-delete" 
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CreatorCard;
