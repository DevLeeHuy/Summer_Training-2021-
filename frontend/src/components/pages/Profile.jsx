import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import ProfileRouter from "../../router/ProfileRouter";
import { UserContext } from "../contexts/UserContext";
import ProfileSidebar from "../partials/ProfileSidebar";

export default function Profile() {
  const { user } = useContext(UserContext);
  const { path, url } = useRouteMatch();
  return (
    <div className="row p-4 ">
      <div className="col-3">
        <ProfileSidebar user={user} url={url} />
      </div>
      <div className="col-9">
        <ProfileRouter path={path} />
      </div>
    </div>
  );
}
