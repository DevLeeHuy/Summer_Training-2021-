import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import ProfileRouter from "../../router/ProfileRouter";
import { UserContext } from "../contexts/UserContext";
import ProfileSidebar from "../partials/ProfileSidebar";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { path, url } = useRouteMatch();
  return (
    <div className="row p-4 w-100">
      <button
        className="btn btn-light profile-sidebar-btn p-2 d-none"
        style={{ width: "50px", height: "50px" }}
        data-mdb-toggle="offcanvas"
        data-mdb-target="#ProfileSidebar"
        aria-controls="ProfileSidebar"
      >
        <i className="fas fa-bars " style={{ fontSize: "24px" }}></i>
      </button>
      <div className="col-3 profile-sidebar-container ">
        <ProfileSidebar user={user} url={url} />
      </div>
      <div className="col">
        <ProfileRouter path={path} />
      </div>

      <div
        id="ProfileSidebar"
        className="offcanvas offcanvas-start  "
        tabIndex="-1"
        aria-labelledby="ProfileSidebarLabel"
      >
        <ProfileSidebar user={user} url={url} />
        <button
          className="btn btn-dark mt-3"
          data-mdb-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
}
