import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../../context/RecipesContext';
import IngredientsList from './IngredientsList';
import shareIcon from '../../images/shareIcon.svg';
import FavoriteRecipeBtn from './FavoriteRecipeBtn';
import age from '../../images/age.png';

function RecipeCard() {
  const [haveLink, setHaveLink] = useState(false);
  const {
    recipe,
    getRecipe,
    doneRecipe,
    setAnyToLocalStorage,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    getRecipe(pathname, params.id);
    console.log('[RecipeDetails] Fetch do Recipe');
  }, [getRecipe, params, pathname]);

  const TIME_OUT_LINK = 3000;

  useEffect(() => {
    let timeLink;

    if (haveLink) {
      timeLink = setTimeout(() => {
        setHaveLink(false);
      }, TIME_OUT_LINK);
    }
    return () => clearTimeout(timeLink);
  }, [haveLink]);

  function getCategory(item) {
    if (item.type === 'comidas') {
      return item.strCategory;
    }
    return item.strAlcoholic;
  }

  function getClipboard() {
    const { href } = window.location;
    const CUT_IN_PROGRESS = -12;
    if (href.includes('in-progress')) {
      copy(href.slice(0, CUT_IN_PROGRESS));
      setHaveLink(true);
    } else {
      copy(href);
      setHaveLink(true);
    }
  }

  const age18 = (
    <>
      <span>{getCategory(recipe)}</span>
      <img
        className="image-age"
        src={ age }
        alt="age"
      />

    </>
  );

  const alcoholic = (getCategory(recipe) === 'Alcoholic');

  return (
    <div>

      <img
        className="image-details"
        src={ recipe.image }
        alt={ recipe.title }
        data-testid="recipe-photo"
      />
      <div className="header-recipe">
        <div>
          <h2 data-testid="recipe-title">{ recipe.title }</h2>
          <p
            data-testid="recipe-category"
          >
            { alcoholic ? age18 : getCategory(recipe) }
          </p>
          <div className="icons-svg">
            <input
              className="share-icon"
              alt="Compartilhar"
              data-testid="share-btn"
              onClick={ getClipboard }
              src={ shareIcon }
              type="image"
            />

            <FavoriteRecipeBtn />
          </div>
          {
            haveLink && (
              <p className="link-copy">Link copiado!</p>
            )
          }
        </div>
      </div>

      <div className="container-recipe">
        <h1>Ingredients</h1>
        <IngredientsList />
        {
          pathname.includes('in-progress') && (
            <Link to="/receitas-feitas">
              <button
                disabled={ doneRecipe }
                data-testid="finish-recipe-btn"
                type="button"
                className="button-finish-recipe"
                onClick={ () => setAnyToLocalStorage(recipe, 'doneRecipes') }
              >
                Finalizar Receita
              </button>
            </Link>
          )
        }
        <h1>Instructions</h1>
        <p
          className="instructions"
          data-testid="instructions"
        >
          {
            recipe.strInstructions
          }
        </p>
      </div>

    </div>
  );
}

export default RecipeCard;
