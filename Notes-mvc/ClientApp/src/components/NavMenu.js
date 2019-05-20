import React, { Component } from 'react';
import icon from './icon.png'
import './NavMenu.css';

export default class NavMenu extends Component {
  render () {
    return (
      <header>
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={icon} alt="EasyNote" /> 
                        Ez Note
                    </a>
                </div>
            </nav>
      </header>
    );
  }
}
