import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';
import fetchAPI from '../services/fetchAPI';

function ExploreDrinks() {
  const pageName = 'Explorar Bebidas';
  const history = useHistory();

  async function redirectToRandom() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetchAPI(URL);
    history.push(`/bebidas/${response.drinks[0].idDrink}`);
  }

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <div className="profile-page-container">
        <Link to="/explorar/bebidas/ingredientes">
          <Button
            data-testid="explore-by-ingredient"
            type="button"
            variant="outline-dark"
          >
            Por Ingredientes
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

export default ExploreDrinks;
