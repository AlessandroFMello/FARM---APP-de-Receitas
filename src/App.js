import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import LoginPage from './pages/LoginPage';
import Meals from './pages/Meals';

function App() {
  return (
    // <div className="meals">
    //   <span className="logo">TRYBE</span>
    //   <object
    //     className="rocksGlass"
    //     type="image/svg+xml"
    //     data={ rockGlass }
    //   >
    //     Glass
    //   </object>
    // </div>
    <RecipesProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route exact path="/comidas" component={ Meals } />
        </Switch>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
