import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import logo from "../../images/logo.png";
import { getUserImgUrl } from "../../configs/images";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

export default function Navbar() {
  const { user, unSetCurUser, loginThirdParty } = useContext(UserContext);
  const { shoppingCart } = useContext(CartContext);
  function handleLogoutClick() {
    unSetCurUser();
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink className="navbar-brand mt-2 mt-lg-0 p-1" to="/">
            <img src={logo} height={50} alt="" />
          </NavLink>
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Projects
              </a>
            </li>
          </ul> */}
        </div>
        {user._id ? (
          <div className="d-flex align-items-center">
            {/* SHOPPING CART 🛒 */}
            <Link className="text-light me-3" to="/shopping-cart">
              <span style={{ fontSize: "20px" }}>🛒</span>
              <span className="badge rounded-pill badge-notification bg-danger">
                {shoppingCart.length}
              </span>
            </Link>

            {/* USER PROFILE 🧔 */}
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow me-2"
              href="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={getUserImgUrl(user.picture)}
                className="rounded-circle"
                height={30}
                alt="avatar"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end dropdown-menu-dark me-2"
              aria-labelledby="navbarDropdownMenuLink"
            >
              {user.admin && (
                <li>
                  <Link className="dropdown-item " to="/admin">
                    🧑‍💼 Admin page
                  </Link>
                </li>
              )}
              <li>
                <Link className="dropdown-item " to="/profile">
                  🗃️ My profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/favorite-list">
                  💗 Favorite products
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button className="dropdown-item " onClick={handleLogoutClick}>
                  👋 Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // LOGIN & REGISTER side🔐
          <div className="d-flex align-items-center ">
            <NavLink
              className="btn btn-outline-light  px-3 me-2"
              to="/account?page=0"
            >
              Login
            </NavLink>
            <NavLink className="btn btn-light me-3" to="/account?page=1">
              Sign up for free
            </NavLink>

            <FacebookLogin
              appId="504647520640671"
              // autoLoad
              callback={loginThirdParty.facebook}
              render={(renderProps) => (
                <button
                  className="btn text-white px-3"
                  style={{ backgroundColor: "#324d84" }}
                  onClick={renderProps.onClick}
                >
                  <i className="fab fa-facebook"></i>
                </button>
              )}
            />

            <GoogleLogin
              clientId="1078271206904-ja2kkh495m23u83jtsip584coqbe1828.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  className="btn text-white px-3 ms-1"
                  style={{ backgroundColor: "#BF360C" }}
                  onClick={renderProps.onClick}
                >
                  <i className="fab fa-google"></i>
                </button>
              )}
              onSuccess={loginThirdParty.google}
              onFailure={loginThirdParty.google}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
