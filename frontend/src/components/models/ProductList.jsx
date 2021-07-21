import React from "react";
import ProductItem from "../models/ProductItem";

export default function ProductList(props) {
  const { productList } = props;
  return (
    <div className="product-container">
      <div className="row gx-0 d-flex justify-content-center">
        {productList.map((value, key) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={value._id}>
            <ProductItem item={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
