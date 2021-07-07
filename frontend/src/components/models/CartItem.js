import React, { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";

const IMG_URL = process.env.REACT_APP_PRODUCT_IMAGES_URL;
export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useContext(CartContext);

  const product = item.product;
  const [quantity, setQuantity] = useState(item.quantity);

  function onChangeQuantity(e) {
    setQuantity(e.target.value);
  }
  function handleUpdateQuantity() {
    updateQuantity(product._id, quantity);
  }
  function handleRemoveItem() {
    removeItem(product._id);
  }

  return (
    <div className="row mb-4">
      <div className="col-md-5 col-lg-3 col-xl-3">
        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
          <img
            className="img-fluid w-100"
            src={IMG_URL + product.image}
            alt="Sample"
          />
        </div>
      </div>
      <div className="col-md-7 col-lg-9 col-xl-9">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h5>{product.name}</h5>
              <p className="mb-3 text-muted text-uppercase small">
                {product.category}
              </p>
              <p className="mb-2 text-muted text-uppercase small">
                Color: blue
              </p>
              <p className="mb-3 text-muted text-uppercase small">Size: M</p>
            </div>
            <div>
              <div className="def-number-input number-input safari_only mb-0 w-100">
                <input
                  className="quantity"
                  min={0}
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={onChangeQuantity}
                />
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={handleUpdateQuantity}
                >
                  Save
                </button>
              </div>
              <small
                id="passwordHelpBlock"
                className="form-text text-muted text-center"
              >
                (Note, 1 piece)
              </small>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                className="btn btn-danger btn-sm text-uppercase mr-3"
                onClick={handleRemoveItem}
              >
                <i className="fas fa-trash-alt mr-1" /> Remove item{" "}
              </button>
              <a
                href="#!"
                type="button"
                className="card-link-secondary small text-uppercase"
              >
                <i className="fas fa-heart mr-1" /> Move to wish list{" "}
              </a>
            </div>
            <p className="mb-0">
              <span>
                <strong>{product.price}</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
