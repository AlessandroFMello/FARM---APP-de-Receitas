import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';
import RecipesContext from '../../context/RecipesContext';

function RecipesCategories({ recipeType }) {
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState('');

  const { setRecipes } = useContext(RecipesContext);

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

  function getCategoryUrl(category) {
    if (recipeType === 'meals') {
      return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    if (recipeType === 'drinks') {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    }
  }

  function toggleFilter(target) {
    if (filterName === target.value) {
      setFilterName('');
      setRecipes({});
    } else {
      setFilterName(target.value);
    }
  }

  async function getItemsByCategory({ target }) {
    const valueTypeFilter = target.value;

    const MAX_CARDS = 12;
    const URL = getCategoryUrl(valueTypeFilter);

    const recipesCategory = await fetchAPI(URL);

    const recipesToRender = recipesCategory[recipeType].slice(0, MAX_CARDS);
    setRecipes(recipesToRender);
    toggleFilter(target);
  }

  return (
    <section>
      <button
        type="button"
        name="all"
        data-testid="All-category-filter"
        id="all"
        onClick={ () => { setRecipes({}); } }
        value="all"
      >
        All
      </button>
      {categories.map((category) => (
        <label key={ category } htmlFor={ category }>
          <button
            type="button"
            name="categories"
            data-testid={ `${category}-category-filter` }
            id={ category }
            onClick={ getItemsByCategory }
            value={ category }
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
