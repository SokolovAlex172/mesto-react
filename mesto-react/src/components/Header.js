import headerLogo from '../image/logo.svg';
import React from 'react';

 function Header() {
   return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
        </header>
    )
 }
   
 export default Header;