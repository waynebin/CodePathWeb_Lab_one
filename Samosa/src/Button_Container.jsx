import React from 'react';

const ButtonContainer = () => {
  return (
    <div className="button-container">
      <button className="DoubleStuffed-button">
        <p>Double Stuffed</p>
        <p>+2</p>
      </button>
      <button className="PartyPack-button">
        <p>Party Pack</p>
        <p>+5</p>
      </button>
      <button className="FullFeast-button">
        <p>Full Feast</p>
        <p>+10</p>
      </button>
    </div>
  );
};

export default ButtonContainer;
// This component renders a container with two buttons: "Select" and "Deselect".
// It can be used in the main App component to handle selection and deselection of items.