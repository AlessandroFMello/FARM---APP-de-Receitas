import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const pageName = 'Explorar Bebidas';

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
        <Link to="/">
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

export default ExploreDrinks;
