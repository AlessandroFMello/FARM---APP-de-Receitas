import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';

function MealsBtn() {
  return (
    <Link to="/comidas">
      <button
        type="button"
      >
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meals"
        />
      </button>
    </Link>
  );
}

export default MealsBtn;
