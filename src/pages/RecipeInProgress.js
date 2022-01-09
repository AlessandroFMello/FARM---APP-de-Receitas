import React, { useEffect } from 'react';
import RecipeCard from '../components/body-components/RecipeCard';

function RecipeInProgress() {
  useEffect(() => {
    const storageDoneRecipesKeyExists = localStorage.getItem('doneRecipes');
    if (storageDoneRecipesKeyExists === null) {
      return localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
  }, []);

  return (
    <div>
      <RecipeCard />
    </div>
  );
}

export default RecipeInProgress;
