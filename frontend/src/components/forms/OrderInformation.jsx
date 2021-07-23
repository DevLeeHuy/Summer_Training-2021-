import React from "react";
import { useRouteMatch } from "react-router-dom";
import OrderRouter from "../../router/OrderRouter";

export default function OrderInformation() {
  let { path } = useRouteMatch();

  return (
    <div>
      <h1>Order Information</h1>
      <OrderRouter path={path} />
    </div>
  );
}
