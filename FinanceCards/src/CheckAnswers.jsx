import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import cardData from './CardData';
import './CheckAns.css';

/*
    checkanswers component is used to verify the answers of the flashcards.
    It takes cardPairs and currentCardIndex as props.
    cardPairs is an array of objects containing question and answer cards.
    currentCardIndex is the index of the current card being displayed.
    it allows the user to input their answer and check it against the correct answer.
    steps:
    1. The user is shown a question card.
    2. Provide an input field for the user to enter their answer.
    3. Compare the user's answer with the correct answer.
    4. Provide feedback to the user.
    5. create an array of card pairs, each containing a question and an answer pair.
    6. once i get the answer, i will compare it with the correct answer and provide feedback.
    7. if the answer is correct, i will show a green box around the answer.
    8. if the answer is incorrect, i will show a red box around the answer


*/ 


const CheckAnswers = ({ cardData, currentCardIndex }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [cssColor, setCssColor] = useState('');

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };
    useEffect(() => {
    setUserAnswer('')
    setCssColor('')
  }, [currentCardIndex])

    const handleCheckAnswer = () => {
        const correctAnswer = cardData[currentCardIndex].answer.trim().toLowerCase();
        const userInput = userAnswer.trim().toLowerCase();
        if (userInput === correctAnswer) {
            
            setCssColor("Green");
        } else {
            setCssColor("Red");
        }
    };

    return (
        <div className="answer-section">
            <input
                type="text"
                value={userAnswer}
                onChange={handleInputChange}
                placeholder="Type your answer here"
                className={`answer-input ${cssColor}`}
                style={{ borderColor: cssColor === "Green" ? 'green' : cssColor === "Red" ? 'red' : 'black' }}
            />

            <button className={`check-answer-button ${cssColor}`} onClick={handleCheckAnswer}>Check Answer</button>

        </div>
    );
};



export default CheckAnswers;