import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Home } from '../pages/home';
import { structuredPage } from './structured-page';

export function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={structuredPage(Home)} />
      </Switch>
    </HashRouter>
  );
}
