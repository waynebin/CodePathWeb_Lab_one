import { useState } from 'react'
import React from 'react'
import Card from './Card' // Assuming you have a Card component
import './App.css'
import FlipCard from './CardFlip' 


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

      <div className="header">
        <h1>Finance Cards</h1>
        <p>Manage your finances effectively</p>
        <p>Number of Cards: {count}</p>
      </div>
      <div className="card-container">
        <Card title="Card 1"  />// This is a simple Card component that takes a title as a prop and displays it.
        


      </div>
      
      <button onClick={() => setCount(count + 1)}disabled={count ==10}>
          Next</button>
      
      <button onClick={() => setCount(count - 1)} disabled={count === 0}>
        <span>Previous</span>
      </button>
      










    </div>
  )
}

export default App;
