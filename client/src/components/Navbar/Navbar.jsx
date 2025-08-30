import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useModal } from '../../context/ModalContext.jsx';

const Navbar = () => {
  const { modal, closeModal } = useModal();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Peli+
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/movies" className="nav-links">
                Peliculas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/characters" className="nav-links">
                Personajes
            </Link>
          </li>
        </ul>
      </div>
      {modal.isOpen && (
        <div className={`navbar-modal ${modal.type}`}>
          <p>{modal.message}</p>
          <button onClick={closeModal}>&times;</button>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
