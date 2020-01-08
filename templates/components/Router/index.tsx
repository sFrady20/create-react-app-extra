import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" key="home">
          App Ready
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
