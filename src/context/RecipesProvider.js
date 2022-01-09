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
  const [doneRecipe, setDoneRecipe] = useState(true);
  const [alreadyDone, setAlreadyDone] = useState(false);

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

  const createDate = () => {
    const d = new Date();
    const limit = 10;
    const month = d.getMonth() || 1;
    if (month < limit) {
      return `${d.getDate()}/0${month}/${d.getFullYear()}`;
    }
    return `${d.getDate()}/${month}/${d.getFullYear()}`;
  };

  const setDoneRecipeToLocalStorage = (actualRecipe, params, createDateFn) => {
    const storageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const wichRecipeType = {
      bebidas: ['bebida',
        actualRecipe.strAlcoholic, actualRecipe.strDrink, actualRecipe.strDrinkThumb],
      comidas: ['comida', '', actualRecipe.strMeal, actualRecipe.strMealThumb],
    };
    const area = actualRecipe.strArea || '';
    const category = actualRecipe.strCategory || '';
    const tags = actualRecipe.strTags || '';
    const newDoneRecipesLocalStorage = {
      id: params.id,
      type: wichRecipeType[actualRecipe.type][0],
      area,
      category,
      alcoholicOrNot: wichRecipeType[actualRecipe.type][1],
      name: wichRecipeType[actualRecipe.type][2],
      image: wichRecipeType[actualRecipe.type][3],
      doneDate: createDateFn(),
      tags,
    };

    let newLocalStorage = [newDoneRecipesLocalStorage];

    if (storageDoneRecipes.length > 0) {
      newLocalStorage = [...storageDoneRecipes, newDoneRecipesLocalStorage];
    }

    localStorage.setItem('doneRecipes', JSON.stringify(newLocalStorage));
  };

  const getLocalStorageFirstTime = useCallback(
    (pathname, id, setCheck, actionType) => {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes === null) {
        const first = {
          cocktails: {},
          meals: {},
        };
        return localStorage.setItem('inProgressRecipes', JSON.stringify(first));
      }
      const recipeTypes = {
        comidas: 'meals',
        bebidas: 'cocktails',
      };
      const verifyType = pathname.match('bebidas') || pathname.match('comidas');
      const type = verifyType[0];
      const arrayOfIngredients = inProgressRecipes[recipeTypes[type]][id];
      switch (actionType) {
      case 'getInProgress':
        if (arrayOfIngredients) {
          return arrayOfIngredients;
        }
        break;
      case 'checkIngredients':
        if (arrayOfIngredients) {
          setCheck([...arrayOfIngredients]);
        }
        break;
      default:
        return 0;
      }
    },
    [],
  );

  const getIngredient = useCallback(
    (myRecipe, setIngredientlLength) => {
      const max = 20;
      const ingredientsArr = [];

      for (let i = 1; i < max; i += 1) {
        if (myRecipe[`strIngredient${i}`]) {
          ingredientsArr.push({
            ingredient: myRecipe[`strIngredient${i}`],
            measure: myRecipe[`strMeasure${i}`],
          });
        }
      }
      setIngredientlLength(ingredientsArr);
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

  function verifyIfAllIngredientsChecked(ingredientsLength, checkedIngredients) {
    if (ingredientsLength !== 0 && ingredientsLength === checkedIngredients) {
      setDoneRecipe(false);
    } else if (ingredientsLength !== checkedIngredients) {
      setDoneRecipe(true);
    }
  }

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
    doneRecipe,
    setDoneRecipe,
    verifyIfAllIngredientsChecked,
    getLocalStorageFirstTime,
    getIngredient,
    setDoneRecipeToLocalStorage,
    createDate,
    alreadyDone,
    setAlreadyDone,
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
