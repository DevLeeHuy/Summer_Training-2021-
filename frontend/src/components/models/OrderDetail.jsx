import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import BillDetail from "../models/BillDetail";

export default function OrderDetail() {
  const { orders } = useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();
  const [bill, setBill] = useState({});

  useEffect(() => {
    const bill = orders.find((order) => order._id === id);
    setBill(bill);
  }, [orders, id]);
  return (
    <div>
      <button className="btn btn-light" onClick={() => history.goBack()}>
        👈 BACK
      </button>
      <BillDetail bill={bill} />
    </div>
  );
}
