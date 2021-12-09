import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function ExploreIngredients() {
  const pageName = 'Explorar Ingredientes';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

ExploreIngredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreIngredients;
