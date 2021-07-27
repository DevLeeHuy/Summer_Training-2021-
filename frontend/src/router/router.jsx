import React, { useContext } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Navbar from "../components/partials/Navbar";
import Footer from "../components/partials/Footer";
import Home from "../components/pages/Home";
import ProductDetail from "../components/pages/ProductDetail";
import Login from "../components/pages/Signin_signup";
import ShoppingCart from "../components/pages/ShoppingCart";
import AdminPage from "../components/pages/AdminPage";
import ThankyouPage from "../components/pages/ThankyouPage";
import Profile from "../components/pages/Profile";
import FavoriteListPage from "../components/pages/FavoriteListPage";
import { UserContext } from "../components/contexts/UserContext";

export default function MainRouter() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />

        {/* <Route exact path="/admin" component={AdminPage} /> */}

        <Route exact path="/account" component={Login} />
        <Route path="/profile" component={Profile} />

        <Route exact path="/product-detail-:id" component={ProductDetail} />
        <Route exact path="/favorite-list" component={FavoriteListPage} />

        <Route exact path="/shopping-cart" component={ShoppingCart} />

        <Route exact path="/thankyou" component={ThankyouPage} />

        <Route
          path="/admin"
          render={() =>
            user.admin ? (
              <AdminPage />
            ) : (
              <Redirect to={{ pathname: "/account" }} />
            )
          }
        />
      </Switch>
      {!location.pathname.startsWith("/admin") && <Footer />}
    </>
  );
}
