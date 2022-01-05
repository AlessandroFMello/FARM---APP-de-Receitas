import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function RecipesCards({ recipeType }) {
  const { initialFetch, initialFetchObject, recipes } = useContext(RecipesContext);
  // sobe requisito no avaliador
  useEffect(() => {
    initialFetch();
    console.log('[RecipesCards] initialFetch');
  }, [initialFetch]);

  const getRecipeCards = useCallback(
    () => {
      function getRecipeThumb(recipe) {
        const mealOrDrinkObj = {
          drinks: recipe.strDrinkThumb,
          meals: recipe.strMealThumb,
        };
        return mealOrDrinkObj[recipeType];
      }

      function getRecipeName(recipe) {
        const mealOrDrinkObj = {
          drinks: recipe.strDrink,
          meals: recipe.strMeal,
        };
        return mealOrDrinkObj[recipeType];
      }

      function getRecipeId(recipe) {
        const mealOrDrinkObj = {
          drinks: recipe.idDrink,
          meals: recipe.idMeal,
        };
        return mealOrDrinkObj[recipeType];
      }

      function changeRecipeType() {
        if (recipeType === 'drinks') return 'bebidas';
        if (recipeType === 'meals') return 'comidas';
      }

      const MAX_CARDS = 12;

      let recipesToRender;

      if (Object.keys(recipes).length > 0) {
        recipesToRender = recipes[recipeType] || recipes;
      } else if (initialFetchObject[recipeType]) {
        recipesToRender = initialFetchObject[recipeType];
      }
      recipesToRender = recipesToRender.slice(0, MAX_CARDS);

      return (
        recipesToRender.map((recipe, index) => (
          <Link
            to={ `${changeRecipeType()}/${getRecipeId(recipe)}` }
            key={ getRecipeId(recipe) }
          >

            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ getRecipeThumb(recipe) }
                data-testid={ `${index}-card-img` }
                alt={ getRecipeName(recipe) }
              />
              <h3 data-testid={ `${index}-card-name` }>{ getRecipeName(recipe) }</h3>
            </div>
          </Link>
        ))
      );
    },
    [recipes, initialFetchObject, recipeType],
  );

  useEffect(() => {
    getRecipeCards();
  }, [getRecipeCards, recipes]);

  return (
    <section className="recipe-cards">
      { getRecipeCards() }
    </section>
  );
}

RecipesCards.propTypes = {
  recipeType: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default RecipesCards;
