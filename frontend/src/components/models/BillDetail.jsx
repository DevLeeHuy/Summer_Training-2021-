import React from "react";

export default function BillDetail({ bill }) {
  const { customer, list_product, total } = bill || {};
  const { firstname, lastname, phone } = customer || {};
  return (
    <div
      className=" my-container container  mt-3 mb-3  p-4 "
      style={{ width: "500px" }}
    >
      <h1 className="text-center">RECEIPT</h1>
      <hr />
      <div className="text-center">
        <h3>Customer: {firstname + " " + lastname}</h3>
        <span>
          Phone: <b>{phone}</b>
        </span>
      </div>
      <hr />
      <div className="text-center">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {list_product?.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <b>${item.price}</b>
                </td>
                <td>
                  <b>${item.price * item.quantity}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex flex-column align-items-end pe-4">
        <strong className="border-bottom">
          Discount: <span className="ps-4">{0}%</span>
        </strong>
        <strong className="mt-3">
          Total: <span className="ps-4">${total}</span>{" "}
        </strong>
      </div>
    </div>
  );
}
