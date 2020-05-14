import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/user/dashboard" component={UserDashboard}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
