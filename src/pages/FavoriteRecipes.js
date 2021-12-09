import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function FavoriteRecipes() {
  const pageName = 'Receitas Favoritas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipes;
