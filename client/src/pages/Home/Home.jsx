import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenido a Peli+</h1>
        <p>Administra toda la información de tu visor de películas.</p>
        <Link to="/movies" className="home-button">
          Administrar
        </Link>
      </div>
    </div>
  );
};

export default Home;
