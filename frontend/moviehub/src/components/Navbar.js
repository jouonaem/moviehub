import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">MovieHub</div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-blue-200 font-medium">Accueil</Link>
          </li>
          <li>
            <Link to="/search" className="text-white hover:text-blue-200 font-medium">Recherche</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
