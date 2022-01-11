import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import LoginPage from './pages/LoginPage';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreMeals from './pages/ExploreMeals';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreMealsOrigin from './pages/ExploreMealsOrigin';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/comidas"
            component={ Meals }
          />
          <Route
            exact
            path="/comidas/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/bebidas"
            component={ Drinks }
          />
          <Route
            exact
            path="/bebidas/:id"
            component={ RecipeDetails }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ RecipeInProgress }
          />
          <Route
            exact
            path="/explorar"
            component={ Explore }
          />
          <Route
            exact
            path="/explorar/comidas"
            component={ ExploreMeals }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreIngredients }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreMealsOrigin }
          />
          <Route
            exact
            path="/explorar/bebidas/area"
            component={ NotFound }
          />
          <Route
            exact
            path="/explorar/bebidas"
            component={ ExploreDrinks }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreIngredients }
          />
          <Route
            exact
            path="/perfil"
            component={ Profile }
          />
          <Route
            exact
            path="/receitas-feitas"
            component={ RecipesMade }
          />
          <Route
            exact
            path="/receitas-favoritas"
            component={ FavoriteRecipes }
          />
          <Route
            exact
            path="/"
            component={ LoginPage }
          />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
