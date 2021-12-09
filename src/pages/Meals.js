import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function Meals() {
  const pageName = 'Comidas';

  return (
    <div>
      <Header pageName={ pageName } />
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
