import React from 'react';
import Image from './Image';

const Card = ({ image, title, description, alt }) => {
  return (
    
    <div className="card">
      <div className="card-image">
        <Image src={image} alt={alt || title} />
        
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;


