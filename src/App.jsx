import './App.css'
import ShowCreators from './Pages/ShowCreators';


function App() {
  const addCreator = () => {
    window.location.href = "/creators/new";
  }

  return (
    <>
      
      <div className="welcome-container">
        <h1>Welcome to Creatorverse</h1>
        <p>Your one-stop solution for all creative needs.</p>
        <div className="welcome-actions">
          <button onClick={() => window.location.href = "/creators"} className="btn btn-primary">
            View All Creators
          </button>
          <button onClick={addCreator} className="btn btn-secondary">
            Add Creator
          </button>
        </div>
      </div>
      <div className="show-creators">
         <ShowCreators />
      </div>
     
    </>
  )
}

export default App
