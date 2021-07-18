import React, { useContext } from "react";
import { ProductListContext } from "../contexts/ProductListContext";
import SearchForm from "../forms/SearchForm";
import ProductList from "../models/ProductList";
import Pagination from "../partials/Pagination";
import ProductSidebar from "../partials/ProductSidebar";

export default function Home(props) {
  const { filters, setFilters, setDefaultFilters, productList, numOfPages } =
    useContext(ProductListContext);

  function handleSearchClick(text) {
    if (text) setFilters({ ...filters, name: text });
  }
  function handleClearClick() {
    setDefaultFilters();
  }

  function handleChangePage(curPage) {
    setFilters({ ...filters, page: curPage });
  }

  return (
    <>
      <div className="content row gx-0 mt-3">
        <div className="row">
          <div className="col-6"></div>
          <div className="col">
            <SearchForm
              onSearchClick={handleSearchClick}
              onClearClick={handleClearClick}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2">
            <ProductSidebar />
          </div>
          <div className="col-10">
            {Object.getOwnPropertyNames(filters).length > 2 && (
              <div className="mb-2">
                <button className="btn btn-default" onClick={handleClearClick}>
                  <i className="fas fa-chevron-left me-2"></i>
                  SHOW ALL
                </button>
              </div>
            )}
            <ProductList productList={productList} />
            <div className="pagination d-flex justify-content-end p-4 ">
              <Pagination
                onPageChange={handleChangePage}
                numOfPages={numOfPages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
