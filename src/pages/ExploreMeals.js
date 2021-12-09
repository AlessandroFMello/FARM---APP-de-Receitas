import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function ExploreMeals() {
  const pageName = 'Explorar Comidas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <Footer />
    </div>
  );
}

ExploreMeals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreMeals;
