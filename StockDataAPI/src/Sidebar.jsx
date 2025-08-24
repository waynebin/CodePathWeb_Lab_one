import React from "react";
import { useState, useEffect } from "react";

function Sidebar({ ticker }) {
  const [previouslyViewedStocks, setPreviouslyViewedStocks] = useState([]);

  useEffect(() => {
    // Add ticker to the list if it's new and not null
    if (ticker && !previouslyViewedStocks.includes(ticker)) {
      setPreviouslyViewedStocks(prevStocks => [...prevStocks, ticker]);
    }
  }, [ticker]); // Only re-run the effect if ticker changes

  // Filter out any null/empty tickers before rendering
  const validStocks = previouslyViewedStocks.filter(t => t);

  return (
    <div className="sidebar">
      <h2>Previously viewed stocks</h2>
      {validStocks.length === 0 ? (
        <p>No stocks viewed yet.</p>
      ) : (
        <ul>
          {validStocks.map((stock, index) => (
            <li key={index}>{stock}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;

