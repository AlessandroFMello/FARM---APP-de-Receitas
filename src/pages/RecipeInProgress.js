import React, { useEffect, useContext } from 'react';
import RecipeCard from '../components/body-components/RecipeCard';
import RecipesContext from '../context/RecipesContext';

function RecipeInProgress() {
  const { ifDoesntExistsCreateALocalStorageKey } = useContext(RecipesContext);
  useEffect(() => {
    ifDoesntExistsCreateALocalStorageKey('doneRecipes', []);
  }, [ifDoesntExistsCreateALocalStorageKey]);

  return (
    <div className="recipe-in-progress">
      <h1>Receita em Andamento</h1>
      <RecipeCard />
    </div>
  );
}

export default RecipeInProgress;
