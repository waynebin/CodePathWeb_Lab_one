import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route} from 'react-router'
import './index.css'
import App from './App.jsx'
import WebForm from './Components/WebForm.jsx'
import CrewGallery from './Pages/CrewGallery.jsx'
import Stats from './Pages/Stats.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/createCrew' element={<WebForm />} />
        <Route path='/viewCrew' element={<CrewGallery />} />
        <Route path='/stats' element={<Stats />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

  

