import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import IngredientsList from './IngredientsList';

function RecipeCard() {
  const { recipe, getRecipe } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    getRecipe(pathname, params.id);
    console.log('[RecipeDetails] Fetch do Recipe');
  }, [getRecipe, params, pathname]);

  function getCategory(item) {
    if (item.type === 'comidas') {
      return item.strCategory;
    }

    return item.strAlcoholic;
  }

  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.title }
        data-testid="recipe-photo"
      />
      <div>
        <h2 data-testid="recipe-title">{ recipe.title }</h2>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <p
        data-testid="recipe-category"
      >
        {getCategory(recipe)}
      </p>
      <IngredientsList />
      <p
        data-testid="instructions"
      >
        {
          recipe.strInstructions
        }
      </p>
    </div>
  );
}

export default RecipeCard;
