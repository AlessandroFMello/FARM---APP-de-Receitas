import React, { useState } from 'react';
import DoneRecipeCard from './DoneRecipeCard';

export default function DoneRecipesCard() {
  const [filterName, setFilterName] = useState('');

  return (
    <div>
      <div className="category-container">
        <button
          className="button-category"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilterName('') }
        >
          All
        </button>
        <button
          className="button-category"
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilterName('comida') }
        >
          Food
        </button>
        <button
          className="button-category"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilterName('bebida') }
        >
          Drinks
        </button>
      </div>
      <DoneRecipeCard filterName={ filterName } />
    </div>
  );
}
