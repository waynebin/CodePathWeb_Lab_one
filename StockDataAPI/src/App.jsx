import { useState } from 'react'
import './App.css'
import Stock from './Stock.jsx'
import StockAttribute from './StockAttribute.jsx'
import Sidebar from './Sidebar.jsx'


console.log('App.jsx loaded');
console.log('Environment variables:', {
  VITE_FINNHUB_API_KEY: import.meta.env.VITE_FINNHUB_API_KEY ? 'Present' : 'Missing',
  VITE_FINNHUB_API_URL: import.meta.env.VITE_FINNHUB_API_URL
});

function App() {
  const [ticker, setTicker] = useState(null);

  return (
    <>
      <div className="App_header">
        <h1>Welcome to the Stock Info</h1>
        <p>This app displays stock information.</p>
        
        <button onClick={() => setTicker(ticker ? null : 'AAPL')}>
          {ticker ? 'Clear Ticker' : 'Set Ticker '}
        </button>
        <input 
          type="text"
          placeholder="Enter stock ticker (e.g., AAPL)"
          value={ticker || ''}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
        />
      </div>
      {/* Controls Section */}
      <div className="App_components">
        <Sidebar />
        <div className="stock-main-content">
          <Stock ticker={ticker} /> 
        </div>
        <StockAttribute />
      </div>
    </>
  )
}

export default App
