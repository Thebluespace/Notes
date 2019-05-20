import React from 'react';
import NavMenu from './NavMenu';
import Header from './Header';

export default props => (
  <div>
        <NavMenu />
        <div className="container">
            <Header />
            {props.children}
        </div>
  </div>
);