import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import RecipesContext from '../../context/RecipesContext';

function MealsBtn() {
  const { setRecipes } = useContext(RecipesContext);

  return (
    <Link to="/comidas">
      <input
        className="svg"
        type="image"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="meals"
        onClick={ () => setRecipes({}) }
      />
    </Link>
  );
}

export default MealsBtn;
