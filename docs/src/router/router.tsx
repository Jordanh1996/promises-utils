import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { structuredPage } from './structured-page';
import { Home } from '../pages/home';
import { Installation } from '../pages/installation';
import { Wait } from '../pages/utils/wait';
import { Waterfall } from '../pages/utils/waterfall';
import { Throttle } from '../pages/utils/throttle';
import { Auto } from '../pages/utils/auto';

export function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={structuredPage(Home)} />
        <Route path="/installation" component={structuredPage(Installation)} />

        <Route path="/docs/wait" component={structuredPage(Wait)} />
        <Route path="/docs/waterfall" component={structuredPage(Waterfall)} />
        <Route path="/docs/throttle" component={structuredPage(Throttle)} />
        <Route path="/docs/auto" component={structuredPage(Auto)} />
      </Switch>
    </HashRouter>
  );
}
