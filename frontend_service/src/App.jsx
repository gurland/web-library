import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Catalog, SearchResults, RegistrationPage, LoginPage, BookPage } from './containers';
import { getFromStorage } from './helpers';

import 'semantic-ui-css/semantic.min.css';
import './styles/App.scss';

export const Context = React.createContext(null);

function App() {
  const accessToken = getFromStorage('accessToken')
  const [authorized, setAuthorized] = React.useState(!!accessToken);

  const contextValue = {
    authorized,
    setAuthorized,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" push exact>
            <Catalog />
          </Route>
          <Route path="/results" push>
            <SearchResults />
          </Route>
          <Route path="/books/:id" push>
            <BookPage />
          </Route>
          <Route path="/registration" push>
            <RegistrationPage />
          </Route>
          <Route path="/login" push>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Context.Provider>
  );
}

export default App;
