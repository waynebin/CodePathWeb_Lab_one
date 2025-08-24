// Sidebar.js
import React, { useState } from "react";
import "../CssStyle/Sidebar.css";

const API_TOKEN = import.meta.env.VITE_FINNHUB_API_KEY;


async function fetchSymbolsAndQuotes(query) {
  if (!query) return [];

  // 1) Search symbols
  const searchRes = await fetch(
    `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${API_TOKEN}`
    //encodeURIComponent(query) ensures special characters in query (like spaces or “&”) are safely URL‑encoded.
  );
  // Check if the response is ok (status 200-299)
  // If not, throw an error to be caught in the calling function
  if (!searchRes.ok) {
    throw new Error(`Search failed: ${searchRes.status}`);
  }
  // Parse the JSON response
  const { result } = await searchRes.json(); // array of { symbol, description }
  // from the result, we only want the top 1 symbols
  const topOne = result.slice(0, 1);

  // 2) Fetch quotes in parallel
  const quotePromises = topOne.map(({ symbol, description }) =>
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_TOKEN}`
    )
      .then(r => {
        if (!r.ok) throw new Error(`Quote fetch failed for ${symbol}`);

        console.log("Quote fetch response:", r);
        return r.json();
      })
      .then(q => ({
        symbol,
        description,
        price:     q.c,
        change:    q.d,
        pctChange: q.dp,
      }))
  );

  return Promise.all(quotePromises);
}

export default function Sidebar({ onSymbolSelect }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults]         = useState([]);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState(null);

  /**
   * Called on every keystroke in the search bar.
   * Triggers a Finnhub search + quote fetch.
   */
  const handleSearch = async (e) => {
    const q = e.target.value;
    setSearchInput(q);
    setError(null);

    if (!q) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchSymbolsAndQuotes(q);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <h2>StockView</h2>

      <input
        type="text"
        placeholder="Search stocks..."
        value={searchInput}
        onChange={handleSearch}
      />

      {loading && <p className="sidebar-loading">Searching…</p>}
      {error   && <p className="sidebar-error">Error: {error}</p>}

      <ul className="sidebar-list">
        {results.map((item, idx) => (
          <li key={idx} className="sidebar-item" onClick={() => onSymbolSelect(item.symbol)}>
            <strong>{item.symbol}</strong> — {item.description}
            <div className="sidebar-quote">
              Price: ${item.price?.toFixed(2) ?? "N/A"} &nbsp;
              Δ${item.change?.toFixed(2) ?? "N/A"} (
              {item.pctChange?.toFixed(2) ?? "N/A"}%)
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

