import React from "react";
import { Switch, Route } from "react-router-dom";
import EditProfile from "../components/forms/EditProfile";
import OrderInformation from "../components/forms/OrderInformation";
import Voucher from "../components/forms/Voucher";

export default function ProfileRouter({ path }) {
  return (
    <Switch>
      <Route exact path={path} component={EditProfile} />
      <Route
        exact
        path={`${path}/order-information`}
        component={OrderInformation}
      />
      {/* <Route exact path={`${path}/voucher`} component={Voucher} /> */}
    </Switch>
  );
}
