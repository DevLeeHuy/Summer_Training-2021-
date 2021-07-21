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

  function showSideBar() {}

  return (
    <>
      <section className="banner-side">
        <div className="sale-banner position-relative ">
          <h2 className="sale-banner-header text-center position-absolute top-50 start-50 translate-middle ">
            <span>
              +25% OFF ALL SALE TEES,
              <br />
              SHIRTS, JEANS &amp; MORE!
            </span>
            <br />
            <span>With code: NEWFITS</span>
          </h2>
        </div>
        <div className="main-banner container mt-4 position-relative ">
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h1 className="p-4">Catching some raves</h1>
            <button className="mt-3 p-3">SHOP THE TREND</button>
          </div>
        </div>
      </section>
      <section className="product-side rowmt-4 container mt-4">
        <div className="product-side-title ">
          <h1>DISCOVER PRODUCTS</h1>
          <span>Shop new and vintage pieces</span>
        </div>
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-light category-btn p-2 d-none"
              style={{ width: "50px", height: "50px" }}
              onClick={showSideBar}
              data-mdb-toggle="offcanvas"
              data-mdb-target="#ProductSidebarMenu"
              aria-controls="ProductSidebarMenu"
            >
              <i className="fas fa-bars " style={{ fontSize: "24px" }}></i>
            </button>
          </div>
          <div className="col">
            <SearchForm
              onSearchClick={handleSearchClick}
              onClearClick={handleClearClick}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2 product-sidebar-container">
            <ProductSidebar />
          </div>

          <div className="col">
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
      </section>

      {/* Sidebar responsive */}
      <div
        id="ProductSidebarMenu"
        className="offcanvas offcanvas-start  "
        tabindex="-1"
        aria-labelledby="ProductSidebarMenuLabel"
      >
        <ProductSidebar />
        <button
          className="btn btn-dark"
          data-mdb-dismiss="offcanvas"
          aria-label="Close"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
    </>
  );
}
