import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function Drinks() {
  const pageName = 'Bebidas';

  return (
    <div>
      <Header pageName={ pageName } />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
