import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function ExploreMeals() {
  const pageName = 'Explorar Comidas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <div className="profile-page-container">
        <Link to="/explorar/comidas">
          <Button
            data-testid="explore-by-ingredient"
            type="button"
            variant="outline-dark"
          >
            Por Ingredientes
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            data-testid="explore-by-area"
            type="button"
            variant="outline-dark"
          >
            Por Local de Origem
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            data-testid="explore-surprise"
            type="button"
            variant="outline-dark"
          >
            Me Surpreenda!
          </Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreMeals;
