import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';

function DrinksBtn() {
  return (
    <Link to="/bebidas">
      <button
        type="button"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinks"
        />
      </button>
    </Link>
  );
}

export default DrinksBtn;
