import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';

function DrinksBtn() {
  return (
    <Link to="/bebidas">
      <input
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drinks"
      />
    </Link>
  );
}

export default DrinksBtn;
