import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useClippy from 'use-clippy';
import RecipesContext from '../../context/RecipesContext';
import IngredientsList from './IngredientsList';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/whiteHeartIcon.svg';

function RecipeCard() {
  const [clipboard, setClipboard] = useClippy();
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

  function getClipboard() {
    const { href } = window.location;
    setClipboard(href);
  }

  return (
    <div>
      <img
        className="imageDetails"
        src={ recipe.image }
        alt={ recipe.title }
        data-testid="recipe-photo"
      />
      <div>
        <h2 data-testid="recipe-title">{ recipe.title }</h2>
        <input
          alt="Compartilhar"
          data-testid="share-btn"
          onClick={ getClipboard }
          style={ { marginLeft: '20px' } }
          src={ shareIcon }
          type="image"
        />
        {
          clipboard && (
            <p>Link copiado!</p>
          )
        }
        <input
          alt="Favoritar"
          data-testid="favorite-btn"
          src={ favoriteIcon }
          type="image"
        />
      </div>
      <p
        data-testid="recipe-category"
      >
        {getCategory(recipe)}
      </p>
      <h1>Ingredients</h1>
      <IngredientsList />
      <h1>Instructions</h1>
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
