import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function IngredientsList() {
  const {
    recipe,
    setDoneRecipe,
    verifyIfAllIngredientsChecked,
    getLocalStorageFirstTime,
    getIngredient,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [check, setCheck] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const params = useParams();

  useEffect(() => {
    getLocalStorageFirstTime(pathname, params.id, setCheck);
  }, [
    getLocalStorageFirstTime,
    pathname,
    params,
    setCheck,
  ]);

  useEffect(() => {
    if (Object.keys(recipe).length > 0) {
      getIngredient(recipe, setIngredients);
    }
  }, [getIngredient, recipe, setIngredients]);

  useEffect(() => {
    verifyIfAllIngredientsChecked(ingredients.length, check.length);
  }, [
    verifyIfAllIngredientsChecked,
    ingredients,
    check,
    setDoneRecipe,
  ]);

  function getIngredientList() {
    return (
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li
            key={ `${ingredient}.${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} `}
            {`- ${measure}`}
          </li>
        ))}
      </ul>
    );
  }

  function lineThroughIngredient({ target }) {
    const { name } = target;
    const wichAPI = {
      comidas: 'meals',
      bebidas: 'cocktails',
    };
    const { type } = recipe;
    const { id } = params;
    let newLocalStorage = {};
    if (target.checked) {
      setCheck((prev) => [...prev, name]);
      const inprogress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inprogress[wichAPI[type]][id]) {
        const prev = [...inprogress[wichAPI[type]][id]];
        newLocalStorage = {
          ...inprogress,
          [wichAPI[type]]: {
            ...inprogress[wichAPI[type]],
            [id]: [...prev, target.name],
          },
        };
      } else {
        newLocalStorage = {
          ...inprogress,
          [wichAPI[type]]: {
            ...inprogress[wichAPI[type]],
            [id]: [target.name],
          },
        };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
    } else {
      const filtered = check.filter((el) => el !== name);
      setCheck(filtered);
      const inprogress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inprogress[wichAPI[type]][id]) {
        const prev = [...inprogress[wichAPI[type]][id]];
        const filter = prev.filter((el) => el !== name);
        newLocalStorage = {
          ...inprogress,
          [wichAPI[type]]: {
            ...inprogress[wichAPI[type]],
            [id]: filter,
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorage));
      }
    }
  }

  function getIngredientCheck() {
    return (
      <div
        className="ingredients-container"
      >
        {ingredients.map(({ ingredient, measure }, index) => (
          <label
            className={ `ingredient-item ${check.includes(ingredient) && 'through'}` }
            key={ `${ingredient}.${index}` }
            htmlFor={ `${ingredient}.${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              className="teste"
              type="checkbox"
              defaultChecked={ check.includes(ingredient) }
              id={ `${ingredient}.${index}` }
              name={ `${ingredient}` }
              onClick={ (e) => lineThroughIngredient(e) }
            />
            {`${ingredient} `}
            {`- ${measure}`}
          </label>
        ))}
      </div>
    );
  }

  return pathname.includes('in-progress') ? getIngredientCheck() : getIngredientList();
}

export default IngredientsList;
