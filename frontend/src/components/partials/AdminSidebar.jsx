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
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Main dashboard</span>
          </NavLink>
          <NavLink
            to={`${url}/product`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2   "
          >
            <i className="fas fa-chart-area fa-fw me-3"></i>
            <span>Manage products</span>
          </NavLink>
          <NavLink
            to={`${url}/user`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <i className="fas fa-lock fa-fw me-3"></i>
            <span>Manage users</span>
          </NavLink>
          <NavLink
            to={`${url}/review`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <i className="fas fa-lock fa-fw me-3"></i>
            <span>Reviews</span>
          </NavLink>
          <NavLink
            to={`${url}/voucher`}
            activeClassName="active"
            className="list-group-item list-group-item-action py-2  "
          >
            <i className="fas fa-lock fa-fw me-3"></i>
            <span>Vouchers</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
