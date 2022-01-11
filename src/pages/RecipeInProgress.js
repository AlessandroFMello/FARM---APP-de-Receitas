import React, { useEffect, useContext } from 'react';
import RecipeCard from '../components/body-components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import GoBack from '../components/header-components/GoBack';

function RecipeInProgress() {
  const { ifDoesntExistsCreateALocalStorageKey } = useContext(RecipesContext);
  useEffect(() => {
    ifDoesntExistsCreateALocalStorageKey('doneRecipes', []);
  }, [ifDoesntExistsCreateALocalStorageKey]);

  return (
    <div className="recipe-in-progress">
      <div className="recipe-details-header">
        <GoBack />
        <h1>Receita em Andamento</h1>
      </div>

      <RecipeCard />
    </div>
  );
}

export default RecipeInProgress;
