import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Search } from './pages/search';
import { Analyze } from './pages/analyze';

export const Routes = () => (
  <Router>
    <Switch>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/analyze">
        <Analyze />
      </Route>
      <Redirect to="/search" />
    </Switch>
  </Router>
);
