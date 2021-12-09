import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function ExploreDrinks() {
  const pageName = 'Explorar Bebidas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

ExploreDrinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreDrinks;
