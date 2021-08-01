import React from "react";
import PriceRange from "../input_fields/PriceRange";
import CategoryList from "../models/CategoryList";

export default function ProductSidebar() {
  return (
    <div
      className="product-sidebar-content"
      style={{ borderRight: "1px solid #e0e0e0" }}
    >
      <div className="card">
        <div className="card-group-item">
          <div className="card-header " style={{ backgroundColor: "#EBEBEB" }}>
            <h6 className="title">Similar category </h6>
            {/* <button
              className="btn"
              data-mdb-toggle="collapse"
              data-mdb-target="#test"
              aria-expanded="false"
              aria-controls="test"
            >
              TEST
            </button>

            <div className="collapse" id="test">
              <ul className=" list-unstyled fw-normal pb-1 small mt-1 mb-0 ">
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </ul>
            </div> */}
          </div>
          <div className="filter-content">
            <CategoryList />
            {/* list-group .// */}
          </div>
        </div>
        {/* card-group-item.// */}
        <div className="card-group-item">
          <div className="card-header" style={{ backgroundColor: "#EBEBEB" }}>
            <h6 className="title">Range input </h6>
          </div>
          <div className="filter-content">
            <div className="card-body">
              <div className="form-row">
                <PriceRange />
              </div>
            </div>
            {/* card-body.// */}
          </div>
        </div>
        {/* card-group-item.// */}
      </div>
    </div>
  );
}
