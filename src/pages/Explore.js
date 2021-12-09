import PropTypes from 'prop-types';
import React from 'react';
import ExploreHeader from '../components/ExploreHeader';

function Explore() {
  const pageName = 'Explorar';

  return (
    <div>
      <ExploreHeader pageName={ pageName } />
    </div>
  );
}

Explore.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Explore;
