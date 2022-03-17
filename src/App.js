import './App.css';
import Event from './Event';
import { Route, Routes } from 'react-router-dom';
import ResponseChart from './ResponseChart';
import Success from './Success';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Event />}/>
        <Route path='/chart' element={<ResponseChart/>}/>
        <Route path='/success' element={<Success/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
