import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function IngredientsList() {
  const {
    recipe,
    setDoneRecipe,
    verifyIfAllIngredientsChecked,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [ingredientsLength, setIngredientsLength] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState(0);

  useEffect(() => {
    verifyIfAllIngredientsChecked(ingredientsLength, checkedIngredients);
  }, [
    verifyIfAllIngredientsChecked,
    checkedIngredients,
    ingredientsLength,
    setDoneRecipe,
  ]);

  function getIngredient() {
    const max = 20;
    const ingredientsArr = [];

    for (let i = 1; i < max; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        ingredientsArr.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }
    console.log(pathname);
    return ingredientsArr;
  }

  const ingredients = getIngredient();

  function getIngredientList() {
    return (
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li
            key={ `${ingredient}.${index}` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} `}
            {measure && `- ${measure}`}
          </li>
        ))}
      </ul>
    );
  }

  function lineThroughIngredient({ target }) {
    setIngredientsLength(ingredients.length);
    const father = target.parentElement;
    if (target.checked) {
      father.style.textDecoration = 'line-through';
      setCheckedIngredients((prev) => prev + 1);
    } else if (!target.checked) {
      father.style.textDecoration = 'none';
      setCheckedIngredients((prev) => prev - 1);
    }
  }

  function getIngredientCheck() {
    return (
      <div
        className="ingredients-container"
      >
        {ingredients.map(({ ingredient, measure }, index) => (
          <label
            className="ingredient-item"
            key={ `${ingredient}.${index}` }
            htmlFor={ `${ingredient}.${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${ingredient}.${index}` }
              onClick={ (e) => lineThroughIngredient(e) }
            />
            {`${ingredient} `}
            {measure && `- ${measure}`}
          </label>
        ))}
      </div>
    );
  }

  return pathname.includes('in-progress') ? getIngredientCheck() : getIngredientList();
}

export default IngredientsList;
