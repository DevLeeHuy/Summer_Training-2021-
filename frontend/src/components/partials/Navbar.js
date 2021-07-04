import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const userContext = useContext(UserContext);
  function handleLogoutClick() {
    userContext.unSetCurUser();
  }
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
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
          <NavLink className="navbar-brand mt-2 mt-lg-0" to="/">
            <img
              src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
              height={15}
              alt=""
              loading="lazy"
            />
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
        {userContext.user.name ? (
          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="/">
              <i className="fas fa-shopping-cart" />
            </a>
            <a
              className="text-reset me-3 dropdown-toggle hidden-arrow"
              href="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-bell" />
              <span className="badge rounded-pill badge-notification bg-danger">
                1
              </span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="/">
                  Some news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Another news
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Something else here
                </a>
              </li>
            </ul>
            <a
              className="dropdown-toggle d-flex align-items-center hidden-arrow"
              href="/"
              id="navbarDropdownMenuLink"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                className="rounded-circle"
                height={25}
                alt=""
                loading="lazy"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="/">
                  My profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li>

              <li>
                <button className="dropdown-item" onClick={handleLogoutClick}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
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
