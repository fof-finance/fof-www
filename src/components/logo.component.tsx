/**
 * @format
 */
import React from 'react';
import logo from 'src/assets/img/logo.png';

function Logo(props: any) {
  return (
    <img
      alt="Logo"
      src={logo}
      {...props}
    />
  );
}

export default Logo;
