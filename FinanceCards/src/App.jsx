import React from 'react'
import { useState } from 'react'
import CardFlip from './CardFlip'
import './App.css'

const cardData = [
  { id: 1, question: "What is a budget?", answer: "A plan for how you will spend and save your money" },
  { id: 2, question: "What is compound interest?", answer: "Interest earned on both the principal and previously earned interest" },
  { id: 3, question: "What is a credit score?", answer: "A number that represents your creditworthiness" },
  { id: 4, question: "What is diversification?", answer: "Spreading investments across different assets to reduce risk" },
  { id: 5, question: "What is an emergency fund?", answer: "Money set aside for unexpected expenses" },
  { id: 6, question: "What is inflation?", answer: "The rate at which prices for goods and services rise" },
  { id: 7, question: "What is a mortgage?", answer: "A loan used to purchase real estate" },
  { id: 8, question: "What is a 401(k)?", answer: "An employer-sponsored retirement savings plan" },
  { id: 9, question: "What is the stock market?", answer: "A marketplace where shares of companies are bought and sold" },
  { id: 10, question: "What is net worth?", answer: "Total assets minus total liabilities" }
];

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
