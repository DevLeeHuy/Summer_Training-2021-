import React from "react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar({ url }) {
  return (
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar  bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 m-4 ">
          <NavLink
            exact
            to={url}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2 "
            aria-current="true"
          >
            <span className="me-3">🕹️</span>
            <span>Main dashboard</span>
          </NavLink>
          <NavLink
            to={`${url}/product`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2   "
          >
            <span className="me-3">📦</span>
            <span>Manage products</span>
          </NavLink>
          <NavLink
            to={`${url}/user`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">🧑‍💻</span>
            <span>Manage users</span>
          </NavLink>
          <NavLink
            to={`${url}/review`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">💬</span>
            <span>Reviews</span>
          </NavLink>
          <NavLink
            to={`${url}/voucher`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <span className="me-3">🎟️</span>
            <span>Vouchers</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
