import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function RecipesCards() {
  const { recipes } = useContext(RecipesContext);
  const [recipeType] = Object.keys(recipes);

  function getRecipeThumb(recipe) {
    if (recipe.strDrinkThumb) return recipe.strDrinkThumb;
    if (recipe.strMealThumb) return recipe.strMealThumb;
  }

  function getRecipeName(recipe) {
    if (recipe.strDrink) return recipe.strDrink;
    if (recipe.strMeal) return recipe.strMeal;
  }

  function getRecipeId(recipe) {
    if (recipe.idDrink) return recipe.idDrink;
    if (recipe.idMeal) return recipe.idMeal;
  }

  function getRecipeCards() {
    const MAX_CARDS = 12;
    const recipesToRender = recipes[recipeType].slice(0, MAX_CARDS);

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
  }

  return (
    <section className="recipe-cards">
      { recipeType !== undefined && getRecipeCards() }
    </section>
  );
}

export default RecipesCards;
