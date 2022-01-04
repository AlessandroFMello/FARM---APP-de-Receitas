import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';

function RecipesCategories({ recipeType }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getEndpoint = () => {
      if (recipeType === 'meals') {
        return 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      }
      if (recipeType === 'drinks') {
        return 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      }
    };

    const getCategories = async () => {
      const MAX_CATEGORIES = 5;
      const response = await fetchAPI(getEndpoint());
      const fetchedCategories = response[recipeType].slice(0, MAX_CATEGORIES);

      setCategories(fetchedCategories.map(({ strCategory }) => strCategory));
    };

    console.log('[RecipesCategories] fetch das categorias');
    getCategories();
  }, [recipeType]);

  return (
    <section>
      {categories.map((category) => (
        <label key={ category } htmlFor={ category }>
          <button
            type="button"
            name="categories"
            data-testid={ `${category}-category-filter` }
            id={ category }
            value={ category === selectedCategory }
            onChange={ () => setSelectedCategory(category) }
          >
            {category}
          </button>
        </label>
      ))}
    </section>
  );
}

RecipesCategories.propTypes = {
  recipeType: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default RecipesCategories;
