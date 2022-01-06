import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function IngredientsList() {
  const { recipe } = useContext(RecipesContext);
  const { pathname } = useLocation();

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

  function getIngredientCheck() {
    return (
      <div>
        {ingredients.map(({ ingredient, measure }, index) => (
          <label key={ `${ingredient}.${index}` } htmlFor={ `${ingredient}.${index}` }>
            <input
              type="checkbox"
              id={ `${ingredient}.${index}` }
              data-testid={ `${index}-ingredient-step` }
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
