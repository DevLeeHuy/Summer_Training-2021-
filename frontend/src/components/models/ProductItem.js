import React from "react";
import { NavLink } from "react-router-dom";
export default function ProductItem(props) {
  const item = props.item;
  return (
    <div className="product-item card m-4 p-0 col-3 ">
      {/* <div className="view zoom overlay z-depth-2 rounded">
      </div> */}
      <img className="img-fluid w-100" src={item.image} alt="Sample" />
      <div className="text-center pt-4">
        <h5>{item.name}</h5>
        <p className="mb-2 text-muted text-uppercase small">{item.category}</p>

        <hr />
        <h6 className="mb-3">{item.price} $</h6>
        <button type="button" className="btn btn-primary btn-sm mr-1 mb-2">
          <i className="fas fa-shopping-cart pr-2" />
          Add to cart
        </button>
        <NavLink
          to={"/product-detail-" + item._id}
          className="btn btn-light btn-sm mr-1 mb-2"
        >
          <i className="fas fa-info-circle pr-2" />
          Details
        </NavLink>
        <button
          type="button"
          className="btn btn-danger btn-sm px-3 mb-2 material-tooltip-main"
          data-toggle="tooltip"
          data-placement="top"
          title="Add to wishlist"
        >
          <i className="far fa-heart" />
        </button>
      </div>
    </div>
  );
}
