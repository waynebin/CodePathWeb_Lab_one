import './App.css';
import CardContainer from './CardContainer';
import logo from './assets/20250610_1312_Coding Group Collaboration_remix_01jxdd4r7tejx8hy87nhh75era.png';
import './App.css';


const App = () => {

  return (
    <div className="App">
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Coding At Your Fingertips</h1>
      </header>
      <main>
      <CardContainer />  
      </main>
      <footer>
        <div className="footer-content">
          <p className="footer-text">© 2025 Modern Coding Resource</p>
          <p className="footer-text">All rights reserved.</p>
          <p className="footer-text">Created by Wayne G <a href="https://github.com/WayneG">WayneG</a></p>
        </div>
      </footer>
    </div>
  )
}


export default App
