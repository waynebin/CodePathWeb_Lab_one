import React from 'react';

const Image = (props) => {
  const { src, alt, className } = props;

  return (
    <img
      src={src}
      alt={alt || 'Image'}
      className={className || 'default-image-class'}
    />
  );
}

export default Image;