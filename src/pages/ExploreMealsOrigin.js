import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchAPI from '../services/fetchAPI';

function ExploreMealsOrigin() {
  const pageName = 'Explorar Origem';
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
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
      let URL;
      if (area !== 'All') {
        URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
        const response = await fetchAPI(URL);
        const MAX_SLICE = 12;
        setMeals(response.meals.slice(0, MAX_SLICE));
        console.log('[getMealsByArea] Fetch todas comidas de uma area');
      } else {
        URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const response = await fetchAPI(URL);
        const MAX_SLICE = 12;
        setMeals(response.meals.slice(0, MAX_SLICE));
        console.log('[getMealsByArea] Fetch todas comidas');
      }
    };
    getMealsByArea(selectedArea);
  }, [selectedArea]);

  function getArea({ target }) {
    const area = target.value;
    setSelectedArea(area);
  }

  function renderForm() {
    return (
      <Form.Control
        as="select"
        size="lg"
        data-testid="explore-by-area-dropdown"
        name="areas"
        id="areas"
        onChange={ (e) => getArea(e) }
        custom
        className="select-area"
      >
        <option
          data-testid="All-option"
          defaultValue
        >
          All

        </option>
        {areas.map(({ strArea }, index) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ `${strArea}-${index}` }
            value={ strArea }
          >
            {strArea}
          </option>
        ))}
      </Form.Control>
    );
  }

  return (
    <div>
      <Header pageName={ pageName } />
      { renderForm() }
      <div className="recipe-cards">
        {meals.map((meal, i) => (
          <Link
            to={ `/comidas/${meal.idMeal}` }
            key={ meal.strMeal }
            className="link-origin"
          >
            <div
              data-testid={ `${i}-recipe-card` }
              className="recipe-card"
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
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreMealsOrigin;
