import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';

function RecipesCards() {
  const [firstMap, setFirstMap] = useState([]);
  const [key, setKey] = useState('');
  const { recipes,
    mealOrDrink,
    initialFetchObject,
    initialFetch,
  } = useContext(RecipesContext);
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

  useEffect(() => {
    const mealOrDrinkObj = {
      themealdb: 'meals',
      thecocktaildb: 'drinks',
    };
    if (arrayRecipes.length === 0) {
      const firstArrayRenderRecipes = initialFetchObject[mealOrDrinkObj[mealOrDrink]];
      setKey(mealOrDrinkObj[mealOrDrink]);
      setFirstMap(firstArrayRenderRecipes && firstArrayRenderRecipes.slice(0, MAX_CARDS));
    }
  }, [arrayRecipes.length, mealOrDrink, initialFetchObject]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  return (
    <>
      {
        (arrayRecipes.length === 0 && firstMap) && firstMap.map((recipe, index) => (
          <div
            className="recipe-card"
            key={ `key${index}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ recipe[scheme[key][1]] }
              data-testid={ `${index}-card-img` }
              alt={ recipe[scheme[key][0]] }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { recipe[scheme[key][0]] }
              {console.log('aqui')}
            </h3>
          </div>
        ))
      }
      { verifyArrayRecipes && arrayRenderRecipes.map((recipe, index) => (

        <div
          className="recipe-card"
          key={ `key${index}` }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe[scheme[recipeType][1]] }
            data-testid={ `${index}-card-img` }
            alt={ recipe[scheme[recipeType][0]] }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { recipe[scheme[recipeType][0]] }
          </h3>
        </div>
      ))}
    </>
  );
}

export default RecipesCards;
