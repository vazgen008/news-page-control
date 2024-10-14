import './App.css';
import { useState, createContext } from 'react';
import Axios from 'axios';
import Users  from './components/AllUsers/AllUsers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export const AppContext = createContext();

function App() {
  const [Data, setData] = useState([]);


  const fetchData = async () => {
    try {
      const resp = await Axios.get(`https://news-1a134-default-rtdb.firebaseio.com/.json`);
      const fetchedData = Object.values(resp.data);
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className='App'>
      {/* Routers [8] */}
      <AppContext.Provider value={{ fetchData, Data, setData}}>
        <Router>
          <Routes>
            <Route path='/' element={<Users />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
