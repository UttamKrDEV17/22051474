import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 md:flex md:items-center md:justify-between">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          MyApp
        </NavLink>
        <button
          className="text-white hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'}`}
      >
        <li className="md:ml-6">
          <NavLink
            to="/"
            className="hover:text-gray-400"
            activeClassName="text-yellow-400"
          >
            Home
          </NavLink>
        </li>
        <li className="md:ml-6">
          <NavLink
            to="/top-users"
            className="hover:text-gray-400"
            activeClassName="text-yellow-400"
          >
            Top Users
          </NavLink>
        </li>
        <li className="md:ml-6">
          <NavLink
            to="/trending"
            className="hover:text-gray-400"
            activeClassName="text-yellow-400"
          >
            Trending Posts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
