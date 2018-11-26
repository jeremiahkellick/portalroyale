import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <NavLink activeClassName="selected" className="nav-links" exact to="/">Play!</NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" className="nav-links" to="/about">About</NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" className="nav-links" to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;