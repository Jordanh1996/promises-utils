import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { structuredPage } from './structured-page';
import { Home } from '../pages/home';
import { Installation } from '../pages/installation';

export function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={structuredPage(Home)} />
        <Route path="/installation" component={structuredPage(Installation)} />
      </Switch>
    </HashRouter>
  );
}
