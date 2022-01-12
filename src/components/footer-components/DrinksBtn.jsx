import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import RecipesContext from '../../context/RecipesContext';

function DrinksBtn() {
  const { setRecipes } = useContext(RecipesContext);

  return (
    <Link to="/bebidas">
      <input
        className="svg"
        type="image"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drinks"
        onClick={ () => setRecipes({}) }
      />
    </Link>
  );
}

export default DrinksBtn;
