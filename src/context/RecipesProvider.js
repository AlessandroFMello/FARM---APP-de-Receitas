import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import RecipesContext from './RecipesContext';
import fetchAPI from '../services/fetchAPI';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [mealOrDrink, setMealOrDrink] = useState('');
  const [initialFetchObject, setInitialFetchObject] = useState({
    meals: [],
    drinks: [],
  });
  const [recipe, setRecipe] = useState({});

  // useCallback(parâmetro1, parâmetro2)
  // parâmetro1: função a ser retornada
  // parâmetro2: array de dependências
  const initialFetch = useCallback(
    async () => {
      const mealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

      const fetchInitialMeal = await fetchAPI(mealUrl);
      const fetchInitialDrink = await fetchAPI(drinkUrl);
      setInitialFetchObject({
        meals: fetchInitialMeal.meals,
        drinks: fetchInitialDrink.drinks,
      });
    },
    [],
  );

  const getRecipe = useCallback(
    async (pathname, recipeId) => {
      if (pathname.includes('bebidas')) {
        const fetchRecipe = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const {
          strDrinkThumb,
          strDrink,
        } = fetchRecipe.drinks[0];
        return setRecipe({
          ...fetchRecipe.drinks[0],
          image: strDrinkThumb,
          title: strDrink,
          type: 'bebidas',
        });
      }
      if (pathname.includes('comidas')) {
        const fetchRecipe = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const {
          strMealThumb,
          strMeal,
        } = fetchRecipe.meals[0];
        return setRecipe({
          ...fetchRecipe.meals[0],
          image: strMealThumb,
          title: strMeal,
          type: 'comidas',
        });
      }
    },
    [],
  );

  const context = {
    recipes,
    setRecipes,
    recipe,
    setRecipe,
    getRecipe,
    mealOrDrink,
    setMealOrDrink,
    initialFetchObject,
    initialFetch,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
