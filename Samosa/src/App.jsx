import './App.css';
import ButtonContainer from './Button_Container';
import SamosaImage from './assets/20250611_2122_Golden Samosa_remix_01jxgvkm3mfyzt6dk4qvk6b6y7.png';
import { useState } from 'react';
const App = () => {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  // Function to handle incrementing the count
  const handleIncrement = () => {
    setCount(count + multiplier);
  };
 // Function to check the count and adjust the multiplier
  const checkCount = () => {
    if (count < 0) {
      setCount(0);
    }
    if (count >=1000) {
      setMultiplier(10);
    }
    if (count >=10) {
      setMultiplier(2);
    }
    if (count >=100) {
      setMultiplier(5);
    }
  }
  return (
    <div className="App">
       <div className="header">
            <h1>Samosa Selector</h1>
            <h2>Count: {count}</h2>
            
            <img className="samosa" src={SamosaImage} alt="samosa"
            onClick={() => {handleIncrement()}} /> 
            {/* The image of the samosa is clickable and will increment the count when clicked. 
               we have an annonymous function that calls both handleIncrement and checkCount 
               to ensure the count is updated correctly.
            */

            }
        </div>
        
       <ButtonContainer
          count={count}
          setCount={setCount}
          handleIncrement={handleIncrement}
          checkCount={checkCount}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          
       />

        



        <div className="footer">
          <p>Created by Wayne</p>
          <p>© 2025 Samosa Selector</p>
          <p>All rights reserved</p>
        </div>

    </div>
    
  )
}

export default App