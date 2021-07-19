import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

const IMG_URL = process.env.REACT_APP_PRODUCT_IMAGES_URL;
export default function CartItem({ item }) {
  const product = item.product;
  const { updateQuantity, removeItem, makeDecision } = useContext(CartContext);
  const { user, addToFavoriteList, removeFromFavoriteList } =
    useContext(UserContext);
  const [like, setLike] = useState(() => {
    return user.favorite_list.indexOf(product._id) < 0 ? false : true;
  });
  const [quantity, setQuantity] = useState(item.quantity);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    updateQuantity(product._id, quantity);
  }, [quantity]);

  useEffect(() => {
    makeDecision(product._id, checked);
  }, [checked]);

  function onChangeQuantity(e) {
    setQuantity(e.target.value);
  }

  function handleRemoveItem() {
    removeItem(product._id);
  }
  function handleLikeClick() {
    if (like) {
      setLike(false);
      removeFromFavoriteList(product._id);
    } else {
      setLike(true);
      addToFavoriteList(product._id);
    }
  }

  function onCheckChange() {
    setChecked(checked ? false : true);
  }

  return (
    <div className="row mb-4">
      {/* Check box make sure customer decision ✅ */}
      <div className="col-md-1 col-lg-1 col-xl-1 d-flex justify-content-center align-items-center ">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheckChange}
          className="cart-checkbox"
        />
      </div>
      {/* Image of product 🖼️*/}
      <div className="col-md-5 col-lg-3 col-xl-3">
        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
          <img
            className="img-fluid w-100"
            src={IMG_URL + product.image}
            alt="Sample"
          />
        </div>
      </div>
      <div className="col-md-7 col-lg-8 col-xl-8">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h5>{product.name}</h5>
              <p className="mb-3 text-muted text-uppercase small">
                {product.category.name}
              </p>
              <p className="mb-2 text-muted text-uppercase small">
                Color: blue
              </p>
              <p className="mb-3 text-muted text-uppercase small">Size: M</p>
            </div>
            <div className="text-end">
              <div className="def-number-input number-input safari_only mb-0 w-100 d-flex justify-content-end">
                <div className="md-form input-group mb-3 w-50">
                  <button
                    className="btn btn-md btn-dark m-0 px-3"
                    type="button"
                    onClick={() => {
                      setQuantity(quantity + 1);
                    }}
                  >
                    ➕
                  </button>
                  <input
                    type="number"
                    className="form-control quantity p-2"
                    min={1}
                    name="quantity"
                    value={quantity}
                    onChange={onChangeQuantity}
                    placeholder="Input item quantity"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-md btn-dark m-0 px-3"
                      type="button"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      ➖
                    </button>
                  </div>
                </div>
              </div>
              <small
                id="passwordHelpBlock"
                className="form-text text-muted text-center"
              >
                (Note, 1 piece)
              </small>
              <div>
                <strong>${product.price}</strong>
                <br />
                <span>x{quantity}</span>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                className="btn btn-danger btn-sm text-uppercase "
                onClick={handleRemoveItem}
              >
                <i className="fas fa-trash-alt mr-1" /> Remove item{" "}
              </button>
              {like ? (
                <button
                  type="button"
                  className="btn btn-black btn-sm  "
                  style={{ marginLeft: "2px" }}
                  onClick={handleLikeClick}
                >
                  UNLIKE
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary btn-sm  "
                  style={{ marginLeft: "2px" }}
                  onClick={handleLikeClick}
                >
                  LIKE 👍
                </button>
              )}
            </div>
            <p className="mb-0">
              <span>
                <strong>${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
