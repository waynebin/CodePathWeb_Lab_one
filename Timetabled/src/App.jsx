import './App.css';
import  Calendar from './components/Calendar';

const App = () => {

  return (
    <div className="App">
      <h1>Timetabled</h1>
      <h2>Welcome to Timetabled, Your personal timetable management app!</h2>
      {/* add a Calendar component. */}
      <Calendar />
    </div>
  )
}

export default App
