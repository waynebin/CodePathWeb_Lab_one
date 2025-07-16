import React from "react";
import { useState, useEffect } from "react";
import "../CssStyle/MainDisplay.css";

const API_TOKEN = import.meta.env.VITE_FINNHUB_API_KEY;

function MainDisplay() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    averagePrice: 0,
    medianPrice: 0,
    q1: 0,
    q3: 0,
  });

  // helper fns
  const mean = arr => arr.reduce((sum, x) => sum + x, 0) / arr.length || 0;
  const median = arr => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2
      ? s[mid]
      : (s[mid - 1] + s[mid]) / 2;
  };

  


  useEffect(() => {
    async function fetchSymbolsAndQuotes() {
      try {
        setLoading(true);
        setError(null);
        

        // 1) get all US symbols
        const symRes = await fetch(
          `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_TOKEN}`
        );
        
        // if system response is not ok, throw an error
        if (!symRes.ok) {
          throw new Error(`Failed to fetch symbols: ${symRes.status}`);
        }
        
        // await for the response and parse it to JSON
        const allSymbols = await symRes.json();
       
        
        // take just 10 using slice function to limit the number of stocks
        const ten = allSymbols.slice(0, 10);

        // 2) fetch quote for each symbol in parallel
        const quotePromises = ten.map(sym =>
          fetch(
            `https://finnhub.io/api/v1/quote?symbol=${sym.symbol}&token=${API_TOKEN}`
          )
            .then(r => {
              if (!r.ok) throw new Error(`Failed to fetch quote for ${sym.symbol}`);
              return r.json();
            })
            .then(q => ({
              symbol: sym.symbol,
              description: sym.description,
              price: q.c,       // current price
              change: q.d,      // change
              pctChange: q.dp,  // percent change
            }))
        );
        const stocksWithQuotes = await Promise.all(quotePromises);
        
        console.log('Fetched stock quotes:', stocksWithQuotes);

        setStocks(stocksWithQuotes);

        // compute stats on the prices
        const prices = stocksWithQuotes.map(s => s.price);
        const total = prices.length;
        const averagePrice = mean(prices);
        const medianPrice = median(prices);
        

        setStats({ total, averagePrice, medianPrice });
        setLoading(false);
      } catch (err) {
        console.error('Error loading stock data:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchSymbolsAndQuotes();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Stock Dashboard Summary</h2>
      
      {loading && <p>Loading stock data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <>
          <ul>
            <li><strong>Total stocks shown:</strong> {stats.total}</li>
            <li><strong>Average price:</strong> ${stats.averagePrice.toFixed(2)}</li>
            <li><strong>Median price:</strong> ${stats.medianPrice.toFixed(2)}</li>
         
          </ul>

          <h2>Top 10 US Stocks</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Symbol
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                  Description
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>
                  Price ($)
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>
                  Δ ($)
                </th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>
                  Δ%
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.symbol}>
                  <td style={{ padding: '0.5rem 0' }}>{stock.symbol}</td>
                  <td style={{ padding: '0.5rem 0' }}>{stock.description}</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>
                    {stock.price?.toFixed(2) || 'N/A'}
                  </td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>
                    {stock.change?.toFixed(2) || 'N/A'}
                  </td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right' }}>
                    {stock.pctChange?.toFixed(2) || 'N/A'}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default MainDisplay;
