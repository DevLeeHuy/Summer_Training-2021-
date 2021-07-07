import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import ProductDetail from "../components/pages/ProductDetail";
import Login from "../components/pages/Signin_signup";
import ShoppingCart from "../components/pages/ShoppingCart";

export default function router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/account">
        <Login />
      </Route>
      <Route exact path="/product-detail-:id" component={ProductDetail} />
      <Route exact path="/shopping-cart" component={ShoppingCart} />
    </Switch>
  );
}
