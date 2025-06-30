import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import './index.css'
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Notesapp from './pages/Notesapp';
function App() {
  return (
    <Router>
      <div className='container' style={{padding:'20px'}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About/>} />
    <Route path='/register' element={<Register />} /> 
    <Route path='/notesapp' element={<Notesapp />} />

        </Routes>
      </div>
    
    </Router>

  );
}

export default App;
