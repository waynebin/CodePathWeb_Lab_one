import { useState } from 'react'
import APIForm from '../Components/APIForm';

import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function App() {
  const[inputs,setInputs] = useState({
    url: '',
    format: '',
    no_ads:"",
    no_cookies_banners:"",
    width:"",
    height:"",
  });

  
 const submitForm =() =>{}
  return (
    <>
      <header className="App-header">
          <h1>Welcome to ScreenShot</h1>
          <p>Capture and manage your screenshots easily!</p>
      </header>
     <div className="whole-page">
          <h1>Build Your Screenshot</h1>
          <APIForm inputs={inputs}
            handleChange={(e)=>setInputs((prevState)=>({
              ...prevState,
              [e.target.name]:e.target.value.trim(),
            }))}
            onSubmit={submitForm}
          
          
          />
          <br></br>

      </div>


    </>
  )
}

export default App
