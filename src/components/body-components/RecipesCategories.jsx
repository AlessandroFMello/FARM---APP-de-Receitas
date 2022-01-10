import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import fetchAPI from '../../services/fetchAPI';
import RecipesContext from '../../context/RecipesContext';

function RecipesCategories({ recipeType }) {
  const [categories, setCategories] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [isAllButtonSelected, setIsAllButtonSelected] = useState(false);

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
      document.getElementById(target.value).blur();
      setFilterName('');
      setRecipes({});
    } else {
      setFilterName(target.value);
    }
  }

  async function getItemsByCategory({ target }) {
    setIsAllButtonSelected(false);
    const valueTypeFilter = target.value;

    const MAX_CARDS = 12;
    const URL = getCategoryUrl(valueTypeFilter);

    const recipesCategory = await fetchAPI(URL);

    const recipesToRender = recipesCategory[recipeType].slice(0, MAX_CARDS);
    setRecipes(recipesToRender);
    toggleFilter(target);
  }

  function handleAllButtonClick() {
    setRecipes({});
    setIsAllButtonSelected((prev) => !prev);

    if (isAllButtonSelected) document.getElementById('all').blur();
  }

  return (
    <section className="category-container">
      <button
        className="button-category"
        type="button"
        name="all"
        data-testid="All-category-filter"
        id="all"
        onClick={ handleAllButtonClick }
        value="all"
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={ category }
          className="button-category"
          type="button"
          name="categories"
          data-testid={ `${category}-category-filter` }
          id={ category }
          onClick={ getItemsByCategory }
          value={ category }
        >
          {category.split(' ')[0].split('/')[0]}
        </button>
      ))}
    </section>
  );
}

RecipesCategories.propTypes = {
  recipeType: PropTypes.oneOf(['meals', 'drinks']).isRequired,
};

export default RecipesCategories;
