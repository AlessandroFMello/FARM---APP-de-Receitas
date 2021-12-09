import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const pageName = 'Explorar Bebidas';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreDrinks;
