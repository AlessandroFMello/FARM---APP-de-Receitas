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

  const context = {
    recipes,
    setRecipes,
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
