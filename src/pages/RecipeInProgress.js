import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/body-components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress() {
  const { doneRecipe } = useContext(RecipesContext);
  return (
    <div>
      <RecipeCard />
      <Link to="/receitas-feitas">
        <button
          disabled={ doneRecipe }
          data-testid="finish-recipe-btn"
          type="button"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default RecipeInProgress;
