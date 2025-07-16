import { useState } from 'react';
import './App.css';
import Stock from './Stock.jsx';
import StockAttribute from './StockAttribute.jsx';
import Sidebar from './Sidebar.jsx';

console.log('App.jsx loaded');
console.log('Environment variables:', {
  VITE_FINNHUB_API_KEY: import.meta.env.VITE_FINNHUB_API_KEY ? 'Present' : 'Missing',
  VITE_FINNHUB_API_URL: import.meta.env.VITE_FINNHUB_API_URL
});

function App() {
  const [ticker, setTicker] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setTicker(inputValue.toUpperCase());
  };

  return (
    <>
      <div className="App_header">
        <h1>Welcome to the Stock Info</h1>
        <p>This app displays stock information.</p>

        <input
          type="text"
          placeholder="Enter stock ticker (e.g., AAPL)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setTicker(null)}>Clear</button>

      </div>
      <div className="App_components">
        {ticker ? (
          <>
            <Sidebar ticker={ticker} />
            <div className="stock-main-content">
              <Stock ticker={ticker} />
            </div>
            <StockAttribute />
          </>
        ) : (
          <p>Enter a stock ticker to see details.</p>
        )}
      </div>
    </>
  );
}

export default App;
