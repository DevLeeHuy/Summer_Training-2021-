import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import EditProfile from "../forms/EditProfile";
import ProfileSidebar from "../partials/ProfileSidebar";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <div className="row p-4 ">
      <div className="col-3">
        <ProfileSidebar user={user} />
      </div>
      <div className="col-9">
        <Content />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <EditProfile />
    </div>
  );
}
