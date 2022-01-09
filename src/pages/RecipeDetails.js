import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import RecipeCard from '../components/body-components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchAPI from '../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  const params = useParams();
  const { pathname } = useLocation();
  const {
    recipe,
    getLocalStorageFirstTime,
    setAlreadyDone,
    alreadyDone,
  } = useContext(RecipesContext);
  const [recomendations, setRecomendations] = useState({});
  const [inProgress, setInProgress] = useState(false);

  function getYoutubeUrl() {
    const baseUrl = 'https://www.youtube.com/embed/';
    const videoId = recipe.strYoutube.split('=')[1];

    return `${baseUrl}${videoId}`;
  }

  useEffect(() => {
    const imInProgress = getLocalStorageFirstTime(
      pathname, params.id, () => '', 'getInProgress',
    );
    if (imInProgress) {
      setInProgress(true);
    }
  }, [
    getLocalStorageFirstTime,
    pathname,
    params,
    setInProgress,
  ]);

  useEffect(() => {
    const storageDoneRecipesKeyExists = localStorage.getItem('doneRecipes');
    if (storageDoneRecipesKeyExists === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const wichRecipeType = {
      bebidas: [recipe.strDrink],
      comidas: [recipe.strMeal],
    };
    const verifyIfItsNotDone = !alreadyDone && doneRecipes.length > 0;
    const iAlreadyHaveRecipe = wichRecipeType[recipe.type];
    if (verifyIfItsNotDone && iAlreadyHaveRecipe) {
      const recipeName = wichRecipeType[recipe.type][0];
      const isDone = doneRecipes.some((el) => recipeName === el.name);
      if (isDone) {
        return setAlreadyDone(true);
      }
    }
  }, [recipe, setAlreadyDone, alreadyDone]);

  useEffect(() => {
    if (recipe.type) {
      const getRecommendations = async () => {
        let URL;
        if (recipe.type === 'comidas') {
          URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        } else {
          URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        }
        const response = await fetchAPI(URL);
        setRecomendations(response);
      };
      getRecommendations();
    }
  }, [recipe]);

  function getCategory(item) {
    if (item.type === 'comidas') {
      return item.strCategory;
    }
    return item.strAlcoholic;
  }

  function getRecommendationsValue() {
    const maxValue = 6;
    const recommendationsValue = Object
      .values(recomendations)[0] || [];
    const slicedRecommendations = recommendationsValue.slice(0, maxValue);

    return slicedRecommendations.map((element) => {
      if (recipe.type === 'comidas') {
        return {
          ...element,
          image: element.strDrinkThumb,
          title: element.strDrink,
          type: 'bebidas',
        };
      }
      return {
        ...element,
        image: element.strMealThumb,
        title: element.strMeal,
        type: 'comidas',
      };
    });
  }

  function inProgressOrNotButton() {
    const text = inProgress ? 'Continuar Receita' : 'Iniciar Receita';
    return (
      <Link to={ `${history.location.pathname}/in-progress` }>
        <button
          className="start-recipe"
          data-testid="start-recipe-btn"
          style={ { padding: '15px' } }
          type="button"
        >
          {text}
        </button>
      </Link>
    );
  }

  function renderRecommendations() {
    const slicedRecommendations = getRecommendationsValue();
    return (
      slicedRecommendations.map((recomendation, index) => (
        <div
          className="recomendation-card"
          key={ `${recomendation}.${index}` }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            className="img-recomendation"
            src={ recomendation.image }
            alt={ recomendation.title }
          />
          <p>{getCategory(recomendation)}</p>
          <h2
            className="recomendation-title"
            data-testid={ `${index}-recomendation-title` }
          >
            { recomendation.title }
          </h2>
        </div>
      ))
    );
  }

  function renderRecipe() {
    return (
      <div className="recipe-details">
        <h1>Detalhes da Receita</h1>
        <RecipeCard />
        { recipe.type === 'comidas'
          && (
            <div>
              <iframe
                data-testid="video"
                width="100vw"
                height="auto"
                src={ getYoutubeUrl() }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
              />
            </div>
          ) }
        <div className="carousel-recomendation">
          <h1>Recomendadas</h1>
          {renderRecommendations()}
        </div>
        {
          !alreadyDone && (
            inProgressOrNotButton()
          )
        }
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
