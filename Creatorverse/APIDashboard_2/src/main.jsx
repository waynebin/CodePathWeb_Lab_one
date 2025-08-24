import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route} from 'react-router'
import './CssStyle/index.css'
import App from './App.jsx'
import DetailView from './Components/DetailView.jsx'
import NotFound from './Components/NotFound.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/detail" element={<DetailView />} />
        {/* Dynamic route to handle specific symbols */}
        {/* This allows us to navigate to /detail/{symbol} */}
        {/* where {symbol} is a variable part of the URL */}
        {/* For example, /detail/AAPL for Apple Inc. */}
        {/* The useParams hook in DetailView will extract the symbol from the URL */}
        {/* Catch-all route for 404 Not Found */}
        {/* This will render the NotFound component for any unmatched routes */}
        <Route path="*" element={<NotFound />} />
        {/* Dynamic route to handle specific symbols */}
        {/* This allows us to navigate to /detail/{symbol} */}
        {/* where {symbol} is a variable part of the URL */}
        {/* For example, /detail/AAPL for Apple Inc. */}
        {/* The useParams hook in DetailView will extract the symbol from the URL */}
        <Route path="/detail/:symbol" element={<DetailView />} />


      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
