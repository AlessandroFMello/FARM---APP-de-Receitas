import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchAPI';

function ExploreMeals() {
  const pageName = 'Explorar Comidas';
  const history = useHistory();

  async function redirectToRandom() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetchAPI(URL);
    history.push(`/comidas/${response.meals[0].idMeal}`);
  }

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <div className="profile-page-container">
        <Link to="/explorar/comidas/ingredientes">
          <Button
            data-testid="explore-by-ingredient"
            type="button"
            variant="outline-dark"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/comidas/area">
          <Button
            data-testid="explore-by-area"
            type="button"
            variant="outline-dark"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Button
          data-testid="explore-surprise"
          onClick={ () => { redirectToRandom(); } }
          type="button"
          variant="outline-dark"
        >
          Me Surpreenda!
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreMeals;
