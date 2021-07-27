import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/AdminDashboard";
import ManageProduct from "../components/Admin/ManageProduct";

export default function AdminRouter({ path }) {
  return (
    <Switch>
      <Route exact path={path} component={AdminDashboard} />
      <Route exact path={path + "/product"} component={ManageProduct} />
      {/* <Route exact path='/user' component={}/> */}
      {/* <Route exact path='/review' component={}/> */}
      {/* <Route exact path='/voucher' component={}/>  */}
    </Switch>
  );
}
