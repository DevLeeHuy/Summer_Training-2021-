import React from "react";
import { NavLink } from "react-router-dom";
import { getUserImgUrl } from "../../configs/images";

export default function ProfileSidebar({ user, url }) {
  return (
    <div className="container ">
      <div className="d-flex justify-content-center w-100 p-3">
        <img
          src={getUserImgUrl(user.picture)}
          alt="pic"
          className="rounded-circle"
          height="75"
        />
        <div className="ms-3">
          <h1>{user.username}</h1>
          <span>{user.email}</span>
        </div>
      </div>
      <hr />
      <div>
        <div className="profile-list-group">
          <NavLink
            exact
            to={url}
            activeClassName="my-active"
            className="list-group-item"
          >
            <span>
              <i className="far fa-user"></i> Edit profile
            </span>
          </NavLink>
          <NavLink
            to={`${url}/order-information`}
            activeClassName="my-active"
            className="list-group-item"
          >
            <span>
              <i className="fas fa-shopping-basket"></i> Order information
            </span>
          </NavLink>
          <NavLink
            to={`${url}/voucher`}
            activeClassName="my-active"
            className="list-group-item"
          >
            <span>
              <i className="fas fa-tags"></i> Voucher
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
