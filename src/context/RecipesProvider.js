import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function PlanetsProvider({ children }) {
  const [recipes, setRecipes] = useState({});
  const [mealOrDrink, setMealOrDrink] = useState('');

  const context = {
    recipes,
    setRecipes,
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
