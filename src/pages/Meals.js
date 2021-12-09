import PropTypes from 'prop-types';
import React from 'react';
import RecipesCards from '../components/body-components/RecipesCards';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  const pageName = 'Comidas';

  return (
    <div>
      <Header pageName={ pageName } />
      <RecipesCards />
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
