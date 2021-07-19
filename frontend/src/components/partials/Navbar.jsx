import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import logo from "../../images/logo.png";

export default function Navbar() {
  const { user, unSetCurUser } = useContext(UserContext);
  const { shoppingCart } = useContext(CartContext);
  const IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;
  function handleLogoutClick() {
    unSetCurUser();
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light p-0">
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
            <Link className="text-reset me-3" to="/shopping-cart">
              <i className="fas fa-shopping-cart" />
              <span className="badge rounded-pill badge-notification bg-danger">
                {shoppingCart.length}
              </span>
            </Link>

            {/* USER PROFILE 🧔 */}
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={IMG_URL + user.picture}
                className="rounded-circle"
                height={25}
                alt="avatar"
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  My profile
                </Link>
              </li>
              {/* <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li> */}

              <li>
                <button className="dropdown-item" onClick={handleLogoutClick}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          // LOGIN & REGISTER side🔐
          <div className="d-flex align-items-center">
            <NavLink className="btn btn-link px-3 me-2" to="/account?page=0">
              Login
            </NavLink>
            <NavLink className="btn btn-primary me-3" to="/account?page=1">
              Sign up for free
            </NavLink>
            <a
              className="btn btn-dark px-3"
              href="https://github.com/mdbootstrap/mdb-ui-kit"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
