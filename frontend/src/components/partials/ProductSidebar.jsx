import React from "react";
import PriceRange from "../input_fields/PriceRange";
import CategoryList from "../models/CategoryList";

export default function ProductSidebar() {
  return (
    <div
      className="sidebar-container pe-3"
      style={{ borderRight: "1px solid #e0e0e0" }}
    >
      <div className="card">
        <article className="card-group-item">
          <header
            className="card-header "
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <h6 className="title">Similar category </h6>
          </header>
          <div className="filter-content">
            <CategoryList />
            {/* list-group .// */}
          </div>
        </article>
        {/* card-group-item.// */}
        <article className="card-group-item">
          <header
            className="card-header"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            <h6 className="title">Range input </h6>
          </header>
          <div className="filter-content">
            <div className="card-body">
              <div className="form-row">
                <PriceRange />
              </div>
            </div>
            {/* card-body.// */}
          </div>
        </article>
        {/* card-group-item.// */}
      </div>
    </div>
  );
}
