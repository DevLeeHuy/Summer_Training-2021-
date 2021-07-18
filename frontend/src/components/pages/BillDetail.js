import React from "react";
import { useLocation } from "react-router-dom";

export default function BillDetail() {
  const location = useLocation();
  const { bill } = location.state;
  console.log(bill);
  return <div>Thank you</div>;
}
