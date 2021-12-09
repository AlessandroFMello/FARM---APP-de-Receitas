import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function ExploreMeals() {
  const pageName = 'Explorar Comidas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

ExploreMeals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreMeals;
