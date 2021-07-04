import React from "react";
import ProductItem from "../models/ProductItem";

export default function ProductList(props) {
  const { productList } = props;
  return (
    <div className="row gx-0">
      {productList.map((value, key) => (
        <ProductItem item={value} key={value._id} />
      ))}
    </div>
  );
}
