import PropTypes from 'prop-types';
import React from 'react';
import RecipesCards from '../components/body-components/RecipesCards';
import RecipesCategories from '../components/body-components/RecipesCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const pageName = 'Bebidas';

  return (
    <div>
      <Header pageName={ pageName } />
      <RecipesCategories recipeType="drinks" />
      <RecipesCards recipeType="drinks" />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
