import React from "react";
import { useState,useEffect } from 'react';


// create a functional component named BaristaForm
const BaristaForm = () => {
    const onCheckAnswer = () => {
        return(
            <h1>Checking answer...</h1>
            
        )
        // Handle answer checking logic here
    };
    const onNewDrink = () => {
        return(
            <h1>Generating new drink...</h1>
        )
        // Handle new drink generation logic here
    };

    return(
        <div>
            <h2>Hi, I'd like to order a:</h2>
              <form>
                </form>
                <button className="submit-button" type="submit"
                onClick={onCheckAnswer}>Check Answer
                </button>
                <button className="submit-button" type="new-drink-button"
                onClick={onNewDrink}>New Drink
                </button>
                

        </div>

    );
};
const [inputs, setInputs] = useState({
    'temperature': '',
    'milk':'',
    'syrup':'',
    'blendend':'',
});

// variable object to hold the current drink order
const  ingredients = {
    'temperature': ['hot', 'lukewarm', 'cold'],
    'syrup': ['mocha','vanilla','toffee','maple','caramel','other','none'],
    'milk': ['cow','oat','goat','almond','none'],
    'blend': ['yes','turbo','no']
};

export default BaristaForm;