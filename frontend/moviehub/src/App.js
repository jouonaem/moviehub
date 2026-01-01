import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MovieEdit from './pages/MovieEdit';
import UserDetail from './pages/UserDetail';
import Search from './pages/Search';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:name" element={<MovieDetail />} />
          <Route path="/movie/:name/edit" element={<MovieEdit />} />
          <Route path="/user/:username" element={<UserDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
