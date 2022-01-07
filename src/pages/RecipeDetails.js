import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeCard from '../components/body-components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import fetchAPI from '../services/fetchAPI';

function RecipeDetails() {
  const history = useHistory();
  // const params = useParams();

  const { recipe } = useContext(RecipesContext);
  const [recomendations, setRecomendations] = useState({});

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
            style={ { width: '100vw', height: '100px' } }
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
    return (
      <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
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
        <div>
          <h1>Recomendadas</h1>
          {renderRecommendations()}
        </div>
        <Link to={ `${history.location.pathname}/in-progress` }>
          <button
            className="start-recipe"
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </Link>
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
