import React from "react";

export default function AdminDashboard() {
  console.log("do dashboard");
  return (
    <div className="dashboard-container container-fluid">
      <h1>Dashboard</h1>
      <div className="statistic-side d-flex d-flex justify-content-between mt-4">
        <div>
          <h2>Products</h2>
        </div>
      </div>
    </div>
  );
}
