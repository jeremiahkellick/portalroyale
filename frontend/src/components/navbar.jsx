import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NavBar = ({ location: { pathname } }) => {
  return (
    <div className="nav-bar">
      <div>{ pathname }</div>
      <ul>
        <li>
          <NavLink activeClassName="selected" className="nav-links" exact to="/">Play!</NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" className="nav-links" to="/about">About</NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" className="nav-links" to="/demo">Demo</NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" className="nav-links" to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </div>
  );
};


export default withRouter( NavBar );