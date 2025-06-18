import React from 'react'
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
  const createCardPairs = () => {
    const pairs = [];
    for (let i = 0; i < cardData.length; i++) {
      const questionCard = {
        id: (i * 2) + 1,
        question: cardData[i].question
      };
      const answerCard = {
        id: (i * 2) + 2,
        answer: cardData[i].answer
      };
      pairs.push({ questionCard, answerCard });
    }
    return pairs;
  };

  const cardPairs = createCardPairs();

  return (
    <div className="App">
      <div className="header">
        <h1>Finance Flashcards</h1>
        <p>Click on any card to flip between question and answer</p>
        <p>Total Cards: {cardPairs.length * 2}</p>
      </div>
      
      <div className="cards-container">
        {cardPairs.map((pair, index) => (
          <CardFlip
            key={index}
            questionCard={pair.questionCard}
            answerCard={pair.answerCard}
          />
        ))}
      </div>
    </div>
  )
}

export default App;
