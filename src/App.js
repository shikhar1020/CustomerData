import React from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import Customer from "./Customer";
import Biddata from "./BidData";
import Test from "./Test";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Customer />
        </Route>
        <Route exact path="/bid/:id">
          <Biddata />
        </Route>
        <Route exact path="/bider/:id">
          <Test />
        </Route>
      </Switch>
    </BrowserRouter>
    // <Customer />
  );
}

export default App;
