import React from 'react';
import FavoriteRecipesCard from '../components/body-components/FavoriteRecipesCard';
import ExploreHeader from '../components/ExploreHeader';

function FavoriteRecipes() {
  const pageName = 'Receitas Favoritas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <FavoriteRecipesCard />
    </div>
  );
}

export default FavoriteRecipes;
