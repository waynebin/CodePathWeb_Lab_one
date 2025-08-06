import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Post from './Pages/Post.jsx'
import Authin from './Pages/Authin.jsx'
import Register from './Pages/Register.jsx'
import PostChat from './Pages/PostChat.jsx'
import EditPostPage from './Pages/edit.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />} />
        <Route path="/chat" element={<Post />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/" element={<Authin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PostChat/:postId" element={<PostChat />} />
        <Route path="/edit/:postId" element={<EditPostPage />} />

      </Routes>
    </BrowserRouter>
  
)
