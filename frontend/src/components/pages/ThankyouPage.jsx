import React from "react";
import { useLocation } from "react-router-dom";
import BillDetail from "../models/BillDetail";

export default function ThankyouPage() {
  const location = useLocation();
  const { bill } = location.state || {};
  const style = {
    header: {
      fontSize: "100px",
      fontWeight: "bold",
    },
    icon: {
      fontSize: "150px",
      color: "#24B663",
    },
  };

  return (
    <div className="text-center mt-3 container">
      <div className="text-center">
        <h1 style={style.header}>THANK YOU!</h1>
        <i
          class="fa fa-check main-content__checkmark"
          id="checkmark"
          style={style.icon}
        ></i>
        <hr />
        <p>
          You can see your bill details below <i class="fas fa-arrow-down"></i>
        </p>
      </div>
      <div class="main-content"></div>
      <BillDetail bill={bill} />
    </div>
  );
}
