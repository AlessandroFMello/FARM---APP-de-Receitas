import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function ExploreMealsOrigin() {
  const pageName = 'Explorar Origem';

  return (
    <div>
      <Header pageName={ pageName } />
    </div>
  );
}

ExploreMealsOrigin.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreMealsOrigin;
