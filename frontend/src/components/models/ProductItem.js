import React, { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import Success from "../alerts/Success";

export default function ProductItem(props) {
  const product = props.item;
  const { addToCart } = useContext(CartContext);
  const { user, removeFromFavoriteList, addToFavoriteList } =
    useContext(UserContext);

  const [like, setLike] = useState(() => {
    return user.favorite_list?.indexOf(product._id) >= 0 ? true : false;
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  function handleAddToCart() {
    setIsSuccess(true);
    addToCart(product._id).then(() => {
      setIsSuccess(false);
    });
  }
  function handleLikeClick() {
    if (user._id)
      if (like) {
        setLike(false);
        removeFromFavoriteList(product._id);
      } else {
        setLike(true);
        addToFavoriteList(product._id);
      }
    else history.push("/account");
  }
  return (
    <div className="product-item card ms-4 me-4 mb-3 p-0 col-3 pb-3 position-relative">
      <Success isSuccess={isSuccess} />

      <img className="img-fluid w-100" src={product.image} alt="Sample" />
      <div className="text-center pt-4">
        <h5>{product.name}</h5>
        <p className="mb-2 text-muted text-uppercase small">
          {product.category.name}
        </p>
        <div className="rating">
          {[...Array(5)].map((e, index) =>
            index < product.rating.star ? (
              <i className="fas fa-star fa-sm text-primary" key={index} />
            ) : (
              <i className="far fa-star fa-sm text-primary" key={index} />
            )
          )}
        </div>

        <hr />
        <h6 className="mb-3">{product.price} $</h6>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm mr-1 mb-2"
            onClick={handleAddToCart}
          >
            <i className="fas fa-shopping-cart pr-2" />
            Add to cart
          </button>
          <NavLink
            to={"/product-detail-" + product._id}
            className="btn btn-light btn-sm mr-1 mb-2"
            style={{ marginLeft: "3px", marginRight: "3px" }}
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
            onClick={handleLikeClick}
          >
            {like ? (
              <i className="fas fa-heart" />
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
