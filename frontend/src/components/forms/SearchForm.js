import React, { useState } from "react";

export default function SearchForm(props) {
  const [searchInput, setSearchInput] = useState("");
  function onSearchChange(e) {
    setSearchInput(e.target.value);
  }
  function onClearClick(e) {
    e.target.value = "";
    setSearchInput("");
    props.onClearClick();
  }
  return (
    <div className="input-group justify-content-center ">
      <div className="form-outline border border-end-0">
        <input
          type="search"
          onChange={onSearchChange}
          className="form-control"
          id="searchInput"
          value={searchInput}
        />
        <label className="form-label" htmlFor="searchInput">
          Search
        </label>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => props.onSearchClick(searchInput)}
      >
        <i className="fas fa-search" />
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={onClearClick}
        data-mdb-ripple-color="dark"
        style={{ marginLeft: "5px" }}
      >
        CLEAR
      </button>
    </div>
  );
}
