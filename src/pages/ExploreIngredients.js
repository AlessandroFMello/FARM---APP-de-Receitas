import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function ExploreIngredients() {
  const pageName = 'Explorar Ingredientes';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
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
