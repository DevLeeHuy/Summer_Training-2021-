import React, { useContext } from "react";
import CartList from "../models/CartList";
import { CartContext } from "../contexts/CartContext";

export default function ShoppingCart() {
  const { shoppingCart } = useContext(CartContext);

  return (
    <div className="cart-container container mt-4">
      <div className="row  ">
        {/*Grid column*/}
        <div className="col-lg-8">
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
        <div className="col-lg-4">
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
                    <strong>$53.98</strong>
                  </span>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn-primary btn-block waves-effect waves-light"
              >
                go to checkout
              </button>
            </div>
          </div>
          {/* Card */}
          {/* Card */}
          <div className="card mb-3">
            <div className="card-body">
              <a
                className="dark-grey-text d-flex justify-content-between"
                data-toggle="collapse"
                href="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample1"
              >
                Add a discount code (optional)
                <span>
                  <i className="fas fa-chevron-down pt-1" />
                </span>
              </a>
              <div className="collapse" id="collapseExample1">
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
