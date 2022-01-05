import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fetchAPI from '../services/fetchAPI';

function RecipeDetails() {
  const index = 'qualquer coisa';

  const history = useHistory();
  const params = useParams();

  const [recipe, setRecipe] = useState({});

  async function getRecipe() {
    const recipeId = params.id;

    if (history.location.pathname.includes('bebidas')) {
      const fetchRecipe = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const {
        strDrinkThumb,
        strDrink,
      } = fetchRecipe.drinks[0];
      return setRecipe({
        ...fetchRecipe.drinks[0],
        image: strDrinkThumb,
        title: strDrink,
      });
    }
    if (history.location.pathname.includes('comidas')) {
      const fetchRecipe = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const {
        strMealThumb,
        strMeal,
      } = fetchRecipe.meals[0];
      return setRecipe({
        ...fetchRecipe.meals[0],
        image: strMealThumb,
        title: strMeal,
      });
    }
  }

  function renderRecipe() {
    return (
      <div>
        <h1>Detalhes da Receita</h1>
        <img
          src={ recipe.image }
          alt={ recipe.title }
          data-testid="recipe-photo"
        />
        <div>
          <h2 data-testid="recipe-title">{ recipe.title }</h2>
          <button
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favoritar
          </button>
        </div>
        <p
          data-testid="recipe-category"
        >
          Texto da categoria
        </p>
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          Ingredientes
        </p>
        <p
          data-testid="instructions"
        >
          Instruções
        </p>
        <p
          data-testid="video"
        >
          Video
        </p>
        <p
          data-testid={ `${index}-recomendation-card` }
        >
          Receitas recomendadas
        </p>
        <button
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }

  return (
    <div>
      {loading ? getRecipe()}
      {renderRecipe()}
    </div>
  );
}

export default RecipeDetails;
