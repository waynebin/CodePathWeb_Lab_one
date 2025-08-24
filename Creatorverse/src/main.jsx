import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ShowCreators from './Pages/ShowCreators.jsx'
import ViewCreator from './Pages/ViewCreator.jsx'
import EditCreator from './Pages/EditCreator.jsx'
import AddCreator from './Pages/AddCreator.jsx'


createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/creators" element={<ShowCreators />} />
        <Route path="/creators/:id" element={<ViewCreator />} />
        <Route path="/creators/:id/edit" element={<EditCreator />} />
        <Route path="/creators/new" element={<AddCreator />} />
      </Routes>
    </BrowserRouter>
  
)

