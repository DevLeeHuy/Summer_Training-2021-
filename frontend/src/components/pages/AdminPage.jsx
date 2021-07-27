import React from "react";
import AdminSidebar from "../partials/AdminSidebar";
import { useRouteMatch } from "react-router-dom";
import AdminRouter from "../../router/AdminRouter";

export default function AdminPage() {
  const { url, path } = useRouteMatch();
  return (
    <div className="row mt-4">
      <div className="col-2">
        <AdminSidebar url={url} />
      </div>
      <div className="col">
        <AdminRouter path={path} />
      </div>
    </div>
  );
}
