import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';

function IngredientsList() {
  const {
    recipe,
    setDoneRecipe,
    verifyIfAllIngredientsChecked,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [check, setCheck] = useState([]);
  const [ingredientsLength, setIngredientsLength] = useState(0);
  const [checkedIngredients, setCheckedIngredients] = useState(0);
  const params = useParams();

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

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const length = getIngredient();
    if (inProgressRecipes === null) {
      const first = {
        cocktails: {},
        meals: {}
      }
      return localStorage.setItem('inProgressRecipes', JSON.stringify(first))
    }
    const mealOrDrink = {
      comidas: 'meals',
      bebidas: 'cocktails'
    }
    const verifyType = pathname.match('bebidas') || pathname.match('comidas');
    const { id } = params;
    const type = verifyType[0];
    const arrayOfIngredients = inProgressRecipes[mealOrDrink[type]][id];
    if(arrayOfIngredients) {
      setCheck([...arrayOfIngredients]);
    }
  }, []);

  useEffect(() => {
    verifyIfAllIngredientsChecked(ingredientsLength, checkedIngredients);
  }, [
    verifyIfAllIngredientsChecked,
    checkedIngredients,
    ingredientsLength,
    setDoneRecipe,
  ]);

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
    const name = target.name;
    const father = target.parentElement;
    if (target.checked) {
      father.style.textDecoration = 'line-through';
      setCheck((prev) => [...prev, name])
      console.log(check.length)
      setCheckedIngredients((prev) => prev + 1);
      const obj = {
        comidas: 'meals',
        bebidas: 'cocktails'
      }
      const { type } = recipe;
      const id = params.id;
      const inprogress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      let obj2 = {};
      if (inprogress[obj[type]][id]) {
        const prev = [...inprogress[obj[type]][id]];
        obj2 = {
          ...inprogress,
          [obj[type]]: {
            ...inprogress[obj[type]],
            [id]: [...prev, target.name]
          }
        }
      } else {
        obj2 = {
          ...inprogress,
          [obj[type]]: {
            ...inprogress[obj[type]],
            [id]: [target.name]
          }
        }
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj2))
    } else if (!target.checked) {
      console.log(check.length)
      father.style.textDecoration = 'none';
      const filtered = check.filter((el) => el !== name);
      setCheck(filtered)
      setCheckedIngredients((prev) => prev + 1);
      const obj = {
        comidas: 'meals',
        bebidas: 'cocktails'
      }
      const { type } = recipe;
      const id = params.id;
      const inprogress = JSON.parse(localStorage.getItem('inProgressRecipes'))
      let obj2 = {};
      if (inprogress[obj[type]][id]) {
        const prev = [...inprogress[obj[type]][id]];
        const filter = prev.filter((el) => el !== name)
        obj2 = {
          ...inprogress,
          [obj[type]]: {
            ...inprogress[obj[type]],
            [id]: filter
          }
        }
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj2))
    }
  
  }}
  
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
              className="teste"
              type="checkbox"
              defaultChecked={ check.includes(ingredient) }
              id={ `${ingredient}.${index}` }
              name={ `${ingredient}` }
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
