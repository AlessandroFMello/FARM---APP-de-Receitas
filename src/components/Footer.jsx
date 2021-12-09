import React from 'react';
import DrinksBtn from './footer-components/DrinksBtn';
import ExploreBtn from './footer-components/ExploreBtn';
import MealsBtn from './footer-components/MealsBtn';

function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <DrinksBtn />
      <ExploreBtn />
      <MealsBtn />
    </footer>
  );
}

export default Footer;
