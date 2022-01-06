import React from 'react';
import RecipeCard from '../components/body-components/RecipeCard';

function RecipeInProgress() {
  return (
    <div>
      <RecipeCard />
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita

      </button>
    </div>
  );
}

export default RecipeInProgress;
