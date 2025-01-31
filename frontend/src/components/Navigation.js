import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="Navigation">
      <ul className="Navigation-ul">
        <li className="Navigation-li"><Link className="Navigation-link" to="/">Home</Link></li>
        <li className="Navigation-li">|</li>
        <li className="Navigation-li"><Link className="Navigation-link" to="/airlines">Airlines</Link></li>
        <li className="Navigation-li">|</li>
        <li className="Navigation-li"><Link className="Navigation-link" to="/flights">Flights</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
