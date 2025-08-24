import { useEffect, useState } from 'react'
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL
import CoinInfo from './Components/CoinInfo'

import './App.css'

function App() {
  const [list, setList] = useState(null)
  useEffect(() => {
    const fetchAllCoinData= async () => {
        // create the response - handle case where API_KEY might be empty
        const url = API_KEY ? `${API_URL}&api_key=${API_KEY}` : API_URL
        const response= await fetch(url)

        //transform the response into JSON
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        // parse the JSON data
        const data = await response.json()
        setList(data)
    }
    // call the function to fetch data
    fetchAllCoinData().catch(console.error)
  }, [])
    




  return (
    <>
        <div className="header">
          <h1 className="title">CryptoHustler</h1>
        </div>

        <div className="whole-page">
          <h2>My Crypto List</h2>
              <ul>
                  {list && 
                      Object.entries(list.Data)
                      .filter(([, coinData])=> 
                          coinData.IsTrading &&
                          coinData.Algorithm !== 'N/A' &&
                          coinData.ProofType !== 'N/A'
                      )
                      .map(([coin, coinData]) => (
                           <CoinInfo
                          image={list.Data[coin].ImageUrl}
                          name={list.Data[coin].FullName}
                          symbol={list.Data[coin].Symbol}
                        />  
                      ))}                    
                
              </ul>
        </div>
    </>
  )
}

export default App
