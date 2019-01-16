import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Home from './views/Home/Home';
import Product from './views/Product/Product';
import Login from './views/Login/Login';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/products" component={Product}/>
          <Route path="/home" component={Home}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
