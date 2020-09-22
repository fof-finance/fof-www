/**
 * @format
 */
import React from 'react';
import { useLocation } from 'react-router';

function ScrollReset() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default ScrollReset;
