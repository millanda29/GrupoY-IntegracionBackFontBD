import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Characters from "./pages/Characters/Characters";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;
