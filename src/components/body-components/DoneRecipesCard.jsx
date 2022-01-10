import React from 'react';
import DoneRecipeCard from './DoneRecipeCard';

export default function DoneRecipesCard() {
  return (
    <div>
      <div className="category-container">
        <button
          className="button-category"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          className="button-category"
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          className="button-category"
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>
      <DoneRecipeCard />
    </div>
  );
}
