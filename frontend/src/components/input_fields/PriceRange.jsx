import React, { useState, useContext } from "react";
import { ProductListContext } from "../contexts/ProductListContext";
const MAX_PRICE_RANGE = 200;
export default function PriceRange() {
  const { filters, setFilters } = useContext(ProductListContext);

  const [priceRange, setPriceRange] = useState(MAX_PRICE_RANGE);
  function rangeOnChange(e) {
    setPriceRange(e.target.value);
  }
  function handleApplyClick() {
    setFilters({ ...filters, priceRange });
  }
  return (
    <div className="price-range w-100 ">
      <label className="form-label" htmlFor="priceRange">
        Example range
      </label>
      <div className="range">
        <input
          type="range"
          className="form-range "
          min="1"
          max={MAX_PRICE_RANGE}
          value={priceRange}
          id="priceRange"
          onChange={rangeOnChange}
        />
      </div>
      <p>
        Under <b style={{ color: "#16bf2d" }}>${priceRange}</b> 💰
      </p>
      <button
        className="btn btn-dark p-0 float-right"
        style={{ width: "50px", height: "25px" }}
        onClick={handleApplyClick}
      >
        Apply
      </button>
    </div>
  );
}
