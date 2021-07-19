import React from "react";
import CartItem from "./CartItem";

export default function CartList({ cart }) {
  return (
    <div className="card-body">
      <h5 className="mb-4">
        Cart (<span>{cart.length}</span> items)
      </h5>
      {cart.map((cartItem, key) => (
        <CartItem item={cartItem} key={key} />
      ))}
      <hr className="mb-4" />

      <p className="text-primary mb-0">
        <i className="fas fa-info-circle mr-1" /> Do not delay the purchase,
        adding items to your cart does not mean booking them.
      </p>
    </div>
  );
}
