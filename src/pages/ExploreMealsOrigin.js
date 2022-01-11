import React, { useState, useEffect } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../services/fetchAPI';

function ExploreMealsOrigin() {
  const pageName = 'Explorar Origem';
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('American');
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getAllAreas = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetchAPI(URL);
      setAreas(response.meals);
      console.log('[getAllAreas] Fetch all areas');
    };
    getAllAreas();
  }, []);

  useEffect(() => {
    const getMealsByArea = async (area) => {
      const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      if (area !== '') {
        const response = await fetchAPI(URL);
        const MAX_SLICE = 12;
        setMeals(response.meals.slice(0, MAX_SLICE));
        console.log('[getMealsByArea] Fetch todas comidas de uma area');
      }
    };
    getMealsByArea(selectedArea);
  }, [selectedArea]);

  function getArea({ target }) {
    const area = target.value;
    setSelectedArea(area);
  }

  return (
    <div>
      <Header pageName={ pageName } />
      <form>
        <select
          data-testid="explore-by-area-dropdown"
          name="areas"
          id="areas"
          onChange={ getArea }
        >
          {/* <option>Areas</option> */}
          {areas.map(({ strArea }, index) => (
            <option
              data-testid={ `${strArea}-option` }
              key={ `${strArea}-${index}` }
              value={ strArea }
            >
              {strArea}
            </option>
          ))}
        </select>
      </form>
      <div>
        {meals.map((meal, i) => (
          <div
            key={ meal.strMeal }
            data-testid={ `${i}-recipe-card` }
          >
            <img
              data-testid={ `${i}-card-img` }
              className="image-details"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h2
              data-testid={ `${i}-card-name` }
            >
              {meal.strMeal}

            </h2>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreMealsOrigin;
