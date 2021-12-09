import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function RecipesCards() {
  const { recipes } = useContext(RecipesContext);
  const arrayRecipes = Object.keys(recipes);
  const [recipeType] = arrayRecipes;
  const scheme = {
    meals: ['strMeal', 'strMealThumb'],
    drinks: ['strDrink', 'strDrinkThumb'],
  };
  const verifyArrayRecipes = arrayRecipes.length > 0;
  const MAX_CARDS = 12;
  const arrayRenderRecipes = verifyArrayRecipes && recipes[recipeType]
    .slice(0, MAX_CARDS);
  return (
    <div>
      { verifyArrayRecipes && arrayRenderRecipes.map((recipe, index) => (

        <div key={ `key${index}` } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe[scheme[recipeType][1]] }
            data-testid={ `${index}-card-img` }
            alt={ recipe[scheme[recipeType][0]] }
          />
          <h3 data-testid={ `${index}-card-name` }>{ recipe[scheme[recipeType][0]] }</h3>
        </div>
      ))}
    </div>
  );
}

export default RecipesCards;
