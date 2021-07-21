import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import orderApi from "../../api/oderApi";

export default function OrderInformation() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await orderApi.getOrders({ userId: user._id });
        setOrders(response.orders);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user._id]);

  return (
    <div>
      <h1>Order Information</h1>
      <table className="table table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Bill No.</th>
            <th>Product list</th>
            <th>Total cost</th>
            <th>Order date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((bill, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>
                <ul className="list-unstyled">
                  {bill.list_product.map((item) => (
                    <li>{item.product.name}</li>
                  ))}
                </ul>
              </td>
              <td>{bill.total}</td>
              <td>{new Date(bill.createdAt).toLocaleString("en-US")}</td>
              <td>
                <button className="btn btn-light">RECEIVED</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
