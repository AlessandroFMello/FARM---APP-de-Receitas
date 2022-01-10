import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function RecipesCards({ recipeType }) {
  const {
    initialFetch,
    initialFetchObject,
    recipes,
    setAlreadyDone,
    alreadyDone,
    recipe,
    setRecipe,
  } = useContext(RecipesContext);
  // sobe requisito no avaliador
  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  useEffect(() => {
    if (alreadyDone) {
      setAlreadyDone(false);
    }
  });

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      setRecipe({});
    }
  });

  const getRecipeCards = useCallback(
    () => {
      function getRecipeThumb(paramRecipe) {
        const mealOrDrinkObj = {
          drinks: paramRecipe.strDrinkThumb,
          meals: paramRecipe.strMealThumb,
        };
        return mealOrDrinkObj[recipeType];
      }

      function getRecipeName(paramRecipe) {
        const mealOrDrinkObj = {
          drinks: paramRecipe.strDrink,
          meals: paramRecipe.strMeal,
        };
        return mealOrDrinkObj[recipeType];
      }

      function getRecipeId(paramRecipe) {
        const mealOrDrinkObj = {
          drinks: paramRecipe.idDrink,
          meals: paramRecipe.idMeal,
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
        recipesToRender.map((actualRecipe, index) => (
          <Link
            to={ `${changeRecipeType()}/${getRecipeId(actualRecipe)}` }
            key={ getRecipeId(actualRecipe) }
          >
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ getRecipeThumb(actualRecipe) }
                data-testid={ `${index}-card-img` }
                alt={ getRecipeName(actualRecipe) }
              />
              <h3 data-testid={ `${index}-card-name` }>
                { getRecipeName(actualRecipe) }
              </h3>
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
