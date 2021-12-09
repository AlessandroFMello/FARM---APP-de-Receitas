import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function PlanetsProvider({ children }) {
  const [state, setState] = useState([]);
  const [mealOrDrink, setMealOrDrink] = useState('');

  const context = {
    state,
    setState,
    mealOrDrink,
    setMealOrDrink,
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
