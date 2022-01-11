import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';
import cooking from '../images/cooking.gif';

function Explore() {
  const pageName = 'Explorar';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <div className="profile-page-container">
        <Link to="/explorar/comidas">
          <Button
            data-testid="explore-food"
            type="button"
            variant="outline-dark"
          >
            Explorar Comidas
          </Button>
        </Link>
        <Link to="/explorar/bebidas">
          <Button
            data-testid="explore-drinks"
            type="button"
            variant="outline-dark"
          >
            Explorar Bebidas
          </Button>
        </Link>
        <img
          src={ cooking }
          alt="cozinhando"
          className="cooking"
        />
      </div>
      <Footer />
    </div>
  );
}
export default Explore;
