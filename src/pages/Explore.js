import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';
import Footer from '../components/Footer';

function Explore() {
  const pageName = 'Explorar';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Explore;
