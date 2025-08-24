import { useState } from 'react';
import './CardFlip.css';

const CardFlip = ({ questionCard, answerCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card" onClick={handleFlip}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <h3>Question {questionCard.id}</h3>
          <p>{questionCard.question}</p>
        </div>
        <div className="flip-card-back">
          <h3>Answer {answerCard.id}</h3>
          <p>{answerCard.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default CardFlip;