import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';

function MealsBtn() {
  return (
    <Link to="/comidas">
      <input
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="meals"
      />
    </Link>
  );
}

export default MealsBtn;
