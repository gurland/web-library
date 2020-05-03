import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Catalog, SearchResults, RegistrationPage } from './containers';

import 'semantic-ui-css/semantic.min.css';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Catalog />
        </Route>
        <Route path="/results">
          <SearchResults />
        </Route>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
