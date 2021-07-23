import React, { useContext } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function OrderList() {
  const { orders } = useContext(UserContext);
  let { url } = useRouteMatch();

  return (
    <table className="table table-striped text-center">
      <thead className="table-dark">
        <tr>
          <th>Bill No.</th>
          <th>Bill ID</th>
          <th>Product list</th>
          <th>Total cost</th>
          <th>Order date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((bill, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            <td>{bill._id}</td>
            <td>
              <ul className="list-unstyled">
                {bill.list_product.map((item, index) => (
                  <li key={index}>{item.product.name}</li>
                ))}
              </ul>
            </td>
            <td>
              <b>{bill.total}💲</b>
            </td>
            <td>{new Date(bill.createdAt).toLocaleString("en-US")}</td>
            <td>
              <Link to={`${url}/${bill._id}`} className="btn btn-light">
                Detail
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
