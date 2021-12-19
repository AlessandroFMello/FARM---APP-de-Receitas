import PropTypes from 'prop-types';
import React from 'react';
import RecipesCards from '../components/body-components/RecipesCards';
import RecipesCategories from '../components/body-components/RecipesCategories';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  const pageName = 'Comidas';

  return (
    <div>
      <Header pageName={ pageName } />
      <RecipesCategories recipeType="meals" />
      <RecipesCards recipeType="meals" />
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
