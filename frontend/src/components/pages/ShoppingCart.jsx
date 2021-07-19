import React, { useContext, useState } from "react";
import CartList from "../models/CartList";
import { CartContext } from "../contexts/CartContext";
import Confirm from "../forms/Confirm";
import { UserContext } from "../contexts/UserContext";
import userApi from "../../api/userApi";
import { useHistory } from "react-router-dom";

import $ from "jquery";

export default function ShoppingCart() {
  const { shoppingCart, totalCost } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [pending, setPending] = useState(false);
  const history = useHistory();

  function handleCheckout() {
    setPending(true);

    const listProduct = JSON.stringify(
      shoppingCart.filter((e) => e.checked === true)
    );
    const userId = user._id;
    userApi
      .checkout({ listProduct, userId })
      .then((response) => {
        $(".modal-backdrop").hide();
        setPending(false);
        history.push("/bill-detail", { bill: response.bill });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="cart-container container mt-4">
      <div className="row  ">
        {/*Grid column*/}
        <div className="col-lg-9">
          {/* Cart list */}
          <div className="card wish-list mb-3">
            <CartList cart={shoppingCart} />
          </div>
          {/* Cart list  */}

          {/* Card */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-4">Expected shipping delivery</h5>
              <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
            </div>
          </div>
          {/* Card */}
          {/* Card */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-4">We accept</h5>
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                alt="Visa"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://z9t4u9f6.stackpathcdn.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                alt="PayPal acceptance mark"
              />
            </div>
          </div>
          {/* Card */}
        </div>
        {/*Grid column*/}
        {/*Grid column*/}
        <div className="col-lg-3">
          {/* Card */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-3">The total amount of</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary amount
                  <span>$25.98</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>${totalCost.toFixed(2)}</strong>
                  </span>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn-primary btn-block waves-effect waves-light"
                data-mdb-toggle="modal"
                data-mdb-target="#checkoutConfirm"
              >
                checkout
              </button>
              <Confirm
                id="checkoutConfirm"
                confirm={handleCheckout}
                pending={pending}
              />
            </div>
          </div>
          {/* Card */}
          {/* Card */}
          <div className="card mb-3">
            <div className="card-body">
              <strong className="dark-grey-text d-flex justify-content-between">
                Add a discount code (optional)
              </strong>
              <div className="" id="discount">
                <div className="mt-3">
                  <div className="md-form md-outline mb-0">
                    <input
                      type="text"
                      id="discount-code1"
                      className="form-control font-weight-light"
                      placeholder="Enter discount code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
        </div>
        {/*Grid column*/}
      </div>
    </div>
  );
}
