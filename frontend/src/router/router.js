import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";
import Home from "../components/pages/Home";
import ProductDetail from "../components/pages/ProductDetail";
import Login from "../components/pages/Signin_signup";
import ShoppingCart from "../components/pages/ShoppingCart";
import AdminPage from "../components/pages/AdminPage";
import BillDetail from "../components/pages/BillDetail";
export default function MainRouter() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account">
          <Login />
        </Route>
        <Route exact path="/product-detail-:id" component={ProductDetail} />
        <Route exact path="/shopping-cart" component={ShoppingCart} />
        <Route exact path="/admin" component={AdminPage} />
        <Route exact path="/bill-detail" component={BillDetail} />
      </Switch>
      {location.pathname !== "/admin" && <Footer />}
    </>
  );
}
