import React from "react";
import { Switch, Route } from "react-router-dom";
import OrderDetail from "../components/models/OrderDetail";
import OrderList from "../components/models/OrderList";

export default function OrderRouter({ path }) {
  return (
    <Switch>
      <Route exact path={path} component={OrderList} />
      <Route exact path={`${path}/:id`} component={OrderDetail} />
    </Switch>
  );
}
