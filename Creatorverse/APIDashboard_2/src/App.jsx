import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import MainDisplay from './Components/MainDisplay';
import Chart from './Components/Chart';

import './CssStyle/App.css';

const API_TOKEN = import.meta.env.VITE_FINNHUB_API_KEY;

// Fetch all annual series and metrics for a given symbol
async function fetchMetricsForSymbol(symbol) {
  const res = await fetch(
    `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${API_TOKEN}`
  );
  if (!res.ok) {
    throw new Error(`Metric fetch failed for ${symbol}: ${res.status}`);
  }

  const data = await res.json();

  // Merge annual series and flat metrics into one object
  return {
    symbol,
    ...data.series.annual,
    ...data.metric,
  };
}


function App() {
  const [symbol, setSymbol] = useState('MSFT'); // Default symbol
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!symbol) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMetricsForSymbol(symbol);
        setMetrics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [symbol]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Stock Dashboard</h1>
        <p>Welcome to the Stock Dashboard!</p>
      </header>

      {/*Sidebar display */}
      <div className="main-content">
        <div className="sidebar-container">
          <Sidebar onSymbolSelect={setSymbol} />
        </div>

        <div className="content-area">
          {/* Main content will go here */}
          <MainDisplay symbol={symbol}/>
        </div>
        <div className="chart-container">
          {/* Chart component will go here */}
          {loading && <p>Loading chart data...</p>}
          {error && <p>Error: {error}</p>}
          {metrics && !loading && <Chart metrics={metrics} />}
        </div>
      </div>
    </div>
  )
}

export default App;
