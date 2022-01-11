import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchAPI';

function ExploreIngredients() {
  const pageName = 'Explorar Ingredientes';
  const { setRecipes } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState([]);
  const history = useHistory();
  const isMeals = history.location.pathname.includes('comidas');

  useEffect(() => {
    async function fetchIngredients() {
      const MAX_ARR = 12;
      let response;

      const endPoints = {
        meals: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        drinks: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
      };

      if (isMeals) {
        response = await fetchAPI(endPoints.meals);
        setIngredients(response.meals.slice(0, MAX_ARR));
      } else {
        response = await fetchAPI(endPoints.drinks);
        setIngredients(response.drinks.slice(0, MAX_ARR));
      }
      console.log('[ExploreIngredients] Fetch ingredients');
    }
    fetchIngredients();
  }, [history, isMeals]);

  async function addToRecipesContext(ingredient) {
    let response;
    const endPoints = {
      meals: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
      drinks: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    };
    if (isMeals) {
      response = await fetchAPI(endPoints.meals);
    } else {
      response = await fetchAPI(endPoints.drinks);
    }
    setRecipes(response);
    history.push(isMeals ? '/comidas' : '/bebidas');
  }

  function renderIngredients() {
    return (
      ingredients && ingredients.map(({ strIngredient, strIngredient1 }, index) => {
        strIngredient = strIngredient || strIngredient1;
        return (
          <button
            key={ `${strIngredient} - ${index}` }
            onClick={ () => addToRecipesContext(strIngredient) }
            type="button"
          >
            <div
              data-testid={ `${index}-ingredient-card` }
              className="ingredient-card"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ isMeals
                  ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
                  : `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
              />
              <h2
                data-testid={ `${index}-card-name` }
                className="ingredient"
              >
                {strIngredient}

              </h2>
            </div>
          </button>
        );
      })
    );
  }

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <div className="container-ingredientes">
        { renderIngredients() }
      </div>
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreIngredients;
