import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function RecipesMade() {
  const pageName = 'Receitas Feitas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default RecipesMade;
