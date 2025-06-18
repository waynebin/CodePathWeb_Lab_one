import React from 'react'
import './Card.css' 
import { useState } from 'react';







const Card = ({ title, question, answer }) => {
    const [flipped, setFlipped] = useState(false);
    const handleClick = () => {
      setFlipped(!flipped);
    };
  return (
    <div className="card" onClick={handleClick}>
      <h2>{title}</h2>
        <div className={`card-content ${flipped ? 'flipped' : ''}`}>
            {/* Display question and answer 1 and 2 etc */}
       <div className="card-front">
          <h3>Question {question.id}</h3>
          <p>{question.question}</p>
        </div>

        <div className="card-back">
          <h3>Answer {answer.id}</h3>
          <p>{answer.answer}</p>
        </div>
        </div>
    </div>
  )
}
/*
 going to need 20 cards 1-2,3-4,5-6,7-8,9-10,11-12,13-14,15-16,17-18,19-20
 when i click on the card it will show the next card
 when i click on the next button it will show the 3rd if 
 the 1st card is clicked, and so on
*/ 
export default Card
