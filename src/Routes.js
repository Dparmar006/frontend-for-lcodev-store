import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./auth/helper/privateRoutes";

import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import userDashboard from "./user/userDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes
          path="/user/dashboard/"
          exact
          component={userDashboard}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
