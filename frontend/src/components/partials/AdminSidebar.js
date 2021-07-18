import React from "react";

export default function AdminSidebar() {
  return (
    <nav
      id="sidebarMenu"
      className="collapse d-lg-block sidebar collapse bg-white"
    >
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 ">
          <button
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
            aria-current="true"
          >
            <i className="fas fa-tachometer-alt fa-fw me-3"></i>
            <span>Main dashboard</span>
          </button>
          <button
            href="#"
            className="list-group-item list-group-item-action py-2 ripple active"
          >
            <i className="fas fa-chart-area fa-fw me-3"></i>
            <span>Webiste traffic</span>
          </button>
          <button
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fas fa-lock fa-fw me-3"></i>
            <span>Password</span>
          </button>
          <button
            href="#"
            className="list-group-item list-group-item-action py-2 ripple"
          >
            <i className="fas fa-lock fa-fw me-3"></i>
            <span>Password</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
