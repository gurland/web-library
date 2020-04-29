import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar, Catalog, SearchResults } from './components';

import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/">
          <Catalog />
        </Route>
        <Route path="/results">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
