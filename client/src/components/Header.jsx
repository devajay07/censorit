import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
        <div className="left">
        <Link to="/" className="header-link"><h4 >Home</h4></Link>
        </div>
        <Link to="/" className="header-link"><h1>CensorIt</h1></Link>
      <div className="right">
        <Link to="/about" className="header-link"><h4>About</h4></Link>
        <Link to="/feedback" className="header-link"><h4>Feedback</h4></Link>
      </div>
    </div>
  )
}

export default Header
