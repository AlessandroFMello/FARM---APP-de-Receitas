import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContex';

function PlanetsProvider({ children }) {
  const [state, setState] = useState([]);

  const context = {
    state,
    setState,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
