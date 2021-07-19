import React from "react";

export default function ProfileSidebar({ user }) {
  const IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;

  return (
    <div className="profile-sidebar-container  ">
      <div className="d-flex justify-content-center w-100 p-3">
        <img
          src={IMG_URL + user.picture}
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
          <a href="#profile" className="list-group-item">
            <span>
              <i class="far fa-user"></i> Edit profile
            </span>
          </a>
          <a href="#order" className="list-group-item">
            <span>
              <i class="fas fa-shopping-basket"></i> Order information
            </span>
          </a>
          <a href="#voucher" className="list-group-item">
            <span>
              <i class="fas fa-tags"></i> Voucher
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
