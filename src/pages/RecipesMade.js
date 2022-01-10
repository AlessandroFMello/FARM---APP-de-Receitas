import PropTypes from 'prop-types';
import React from 'react';
import DoneRecipesCard from '../components/body-components/DoneRecipesCard';
import ExploreHeader from '../components/ExploreHeader';

function RecipesMade() {
  const pageName = 'Receitas Feitas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <DoneRecipesCard />
    </div>
  );
}

RecipesMade.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default RecipesMade;
