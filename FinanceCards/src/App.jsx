import React from 'react'
import { useState } from 'react'
import CardFlip from './CardFlip'
import CheckAnswers from './CheckAnswers'
import './App.css'
import cardData from './CardData';



function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const createCardPairs = () => {
    const pairs = [];// Create pairs of question and answer cards
    for (let i = 0; i < cardData.length; i++) {
      const questionCard = {
        id: (i * 2) + 1,
        question: cardData[i].question
      };
      const answerCard = {
        id: (i * 2) + 2,
        answer: cardData[i].answer
      };
      pairs.push({ questionCard, answerCard }); // Push the pair into the array
    }
    return pairs;
  };

  const cardPairs = createCardPairs();

  const handleNext = () => {
    if (currentCardIndex < cardPairs.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Finance Flashcards</h1>
        <p>Financial Literacy Your Key to Success.</p>
        <p>CardCount : {currentCardIndex + 1} </p>
      </div>
      
      <div className="card-container">
        <CardFlip
          questionCard={cardPairs[currentCardIndex].questionCard}
          answerCard={cardPairs[currentCardIndex].answerCard}
        />
      </div>

      <CheckAnswers cardData={cardData} currentCardIndex={currentCardIndex} />

      <div className="button-container">
        <button 
          onClick={handlePrevious} 
          disabled={currentCardIndex === 0}
        >
          Previous
        </button>
        
        <button 
          onClick={handleNext} 
          disabled={currentCardIndex === cardPairs.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App;
