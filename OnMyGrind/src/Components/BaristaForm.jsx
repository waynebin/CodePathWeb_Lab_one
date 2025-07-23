import React from "react";
import { useState } from 'react';
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";
import '/CssStyle/BaristaForm.css';


// create a functional component named BaristaForm
const BaristaForm = () => {
    const [inputs, setInputs] = useState({
    'temperature': '',
    'milk':'',
    'syrup':'',
    'blend':'',
    });
    const [currentDrink, setCurrentDrink] = useState('');
    const [trueRecipe, setTrueRecipe] = useState([]);

    const [correctTemp, setCheckedTemp] = useState('');
    const [correctMilk, setCheckedMilk] = useState('');
    const [correctSyrup, setCheckedSyrup] = useState('');
    const [correctBlend, setCheckedBlend] = useState('');
    // useState to hold the current drink and its recipe
    // useState to hold the true recipe of the current drink

    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onCheckAnswer = () => {
      if(trueRecipe.temperature !=inputs.temperature){
        setCheckedTemp('❌ wrong temperature');
      }
      else{
        setCheckedTemp('✅ correct temperature');
      }
      if(trueRecipe.milk !=inputs.milk){
        setCheckedMilk('❌ wrong milk');
      }
      else{
        setCheckedMilk('✅ correct milk');
      }
      if(trueRecipe.syrup !=inputs.syrup){
        setCheckedSyrup('❌ wrong syrup');
      }
      else{
          setCheckedSyrup('✅ correct syrup');
      }
      if(trueRecipe.blend !=inputs.blend){
        setCheckedBlend('❌ wrong blend');
      }
      else{
          setCheckedBlend('✅ correct blend');
      }





    };

    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk':'',
            'syrup':'',
            'blend':'',
        });
        setCheckedTemp('');
        setCheckedMilk('');
        setCheckedSyrup('');
        setCheckedBlend('');
        // Reset the inputs and checked states
        getNextDrink();
    };

    const getNextDrink = () => {
        //we'll use Math to get a random number from 0 to the numerical length of the drinks list in our drinksJson
        let randomDrinkIndex=Math.floor((Math.random()*drinksJson.drinks.length))
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    }

    return(
        <div>
            <h2>Hi, I'd like to order a:</h2>
               <div className="drink-container">
                    <h2 className="mini-header">{currentDrink}</h2>
                    <button className="button new-drink" type="new-drink-button">
                        <span onClick={onNewDrink}>"🔄"</span>
                    </button>
                </div>
              <form className="container">
                <div className="mini-container">
                    <div className="answer-space" id={correctTemp}>
                        {inputs['temperature']}
                    </div>
                    <h3>Temperature</h3>
                    <RecipeChoices
                        handleChange={handleChange}
                        label="temperature"
                        choices={ingredients.temperature}
                        checked={inputs.temperature}
                    />
                    <div className="answer-space" id={correctMilk}>
                        {inputs['milk']}
                    </div>
                    <h3>Milk</h3>
                    <RecipeChoices
                        handleChange={handleChange}
                        label="milk"
                        choices={ingredients.milk}
                        checked={inputs.milk}
                    />
                    <div className="answer-space" id={correctSyrup}>
                        {inputs['syrup']}
                    <h3>Syrup</h3>
                    <RecipeChoices
                        handleChange={handleChange}
                        label="syrup"
                        choices={ingredients.syrup}
                        checked={inputs.syrup}
                    />
                    </div>
                    <div className="answer-space" id={correctBlend}>
                        {inputs['blend']}
                    </div>
                    <h3>Blend</h3>
                    <RecipeChoices
                        handleChange={handleChange}
                        label="blend"
                        choices={ingredients.blend}
                        checked={inputs.blend}
                    />
                </div>
              </form>

                <button className="submit-button" type="button"
                onClick={onCheckAnswer}>Check Answer
                </button>

                <button className="button new-drink" type="button"
                onClick={onNewDrink}>New Drink
                </button>
                

        </div>

    );
};


// variable object to hold the current drink order
const  ingredients = {
    'temperature': ['hot', 'lukewarm', 'cold'],
    'syrup': ['mocha','vanilla','toffee','maple','caramel','other','none'],
    'milk': ['cow','oat','goat','almond','none'],
    'blend': ['yes','turbo','no']
};

export default BaristaForm;