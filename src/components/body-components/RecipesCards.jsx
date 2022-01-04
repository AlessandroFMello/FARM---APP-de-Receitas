import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
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
        if (recipeType === 'drinks') return recipe.strDrinkThumb;
        if (recipeType === 'meals') return recipe.strMealThumb;
      }

      function getRecipeName(recipe) {
        if (recipeType === 'drinks') return recipe.strDrink;
        if (recipeType === 'meals') return recipe.strMeal;
      }

      function getRecipeId(recipe) {
        if (recipeType === 'drinks') return recipe.idDrink;
        if (recipeType === 'meals') return recipe.idMeal;
      }

      const MAX_CARDS = 12;

      let recipesToRender;

      if (Object.keys(recipes).length > 0) {
        recipesToRender = recipes;
      } else if (initialFetchObject[recipeType]) {
        recipesToRender = initialFetchObject[recipeType];
      }

      recipesToRender = recipesToRender.slice(0, MAX_CARDS);
      return (
        recipesToRender.map((recipe, index) => (
          <div
            className="recipe-card"
            key={ getRecipeId(recipe) }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ getRecipeThumb(recipe) }
              data-testid={ `${index}-card-img` }
              alt={ getRecipeName(recipe) }
            />
            <h3 data-testid={ `${index}-card-name` }>{ getRecipeName(recipe) }</h3>
          </div>
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
