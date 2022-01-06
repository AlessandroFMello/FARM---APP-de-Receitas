import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fetchAPI from '../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const params = useParams();

  const [recipe, setRecipe] = useState({});
  const [recomendations, setRecomendations] = useState({});

  useEffect(() => {
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
          type: 'bebidas',
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
          type: 'comidas',
        });
      }
    }

    getRecipe();
    console.log('tudo certo');
  }, [history, params]);

  function getYoutubeUrl() {
    const baseUrl = 'https://www.youtube.com/embed/';
    const videoId = recipe.strYoutube.split('=')[1];

    return `${baseUrl}${videoId}`;
  }

  useEffect(() => {
    if (recipe.type) {
      const getRecommendations = async () => {
        let URL;
        if (recipe.type === 'comidas') {
          URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        }
        if (recipe.type === 'bebidas') {
          URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetchAPI(URL);
        setRecomendations(response);
      };

      getRecommendations();
      console.log('[RecipeDetails] Fetch das recommendations');
    }
  }, [recipe]);

  function getCategory(item) {
    if (item.type === 'comidas') {
      return item.strCategory;
    }

    return item.strAlcoholic;
  }

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

    return ingredientsArr;
  }

  function getRecommendationsValue() {
    const maxValue = 6;
    const recommendationsValue = Object
      .values(recomendations)[0] || [];
    const slicedRecommendations = recommendationsValue.slice(0, maxValue);

    return slicedRecommendations.map((element) => {
      if (recipe.type === 'comidas') {
        const {
          strDrinkThumb,
          strDrink,
        } = element;
        return {
          ...element,
          image: strDrinkThumb,
          title: strDrink,
          type: 'bebidas',
        };
      }
      const {
        strMealThumb,
        strMeal,
      } = element;
      return {
        ...element,
        image: strMealThumb,
        title: strMeal,
        type: 'comidas',
      };
    });
  }

  function renderRecommendations() {
    const slicedRecommendations = getRecommendationsValue();
    return (
      slicedRecommendations.map((recomendation, index) => (
        <div
          hidden={ index >= 2 }
          key={ `${recomendation}.${index}` }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recomendation.image }
            alt={ recomendation.title }
          />
          <p>{getCategory(recomendation)}</p>
          <h2
            data-testid={ `${index}-recomendation-title` }
          >
            { recomendation.title }

          </h2>
        </div>
      ))
    );
  }

  function renderRecipe() {
    const ingredients = getIngredient();

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
          {getCategory(recipe)}
        </p>
        <ul>
          {
            ingredients.map(({ ingredient, measure }, i) => (
              <li
                key={ `${ingredient}.${i}` }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                { `${ingredient} ` }
                { measure && `- ${measure}` }
              </li>
            ))
          }
        </ul>
        <p
          data-testid="instructions"
        >
          {
            recipe.strInstructions
          }
        </p>
        { recipe.type === 'comidas'
          && (
            <div>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ getYoutubeUrl() }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
              />
            </div>
          ) }
        <div>
          <h1>Recomendadas</h1>
          {renderRecommendations()}
        </div>
        <button
          className="start-recipe"
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
      {renderRecipe()}
    </div>
  );
}

export default RecipeDetails;
