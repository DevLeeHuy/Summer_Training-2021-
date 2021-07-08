import React, { useContext } from "react";
import { ProductListContext } from "../contexts/ProductListContext";
import SearchForm from "../forms/SearchForm";
import ProductList from "../models/ProductList";
import Pagination from "../partials/Pagination";

export default function Home(props) {
  const { filters, setFilters, productList, numOfPages } =
    useContext(ProductListContext);
  function handleSearchClick(text) {
    if (text) setFilters({ ...filters, name: text });
  }
  function handleClearClick() {
    delete filters.name;
    setFilters({ ...filters });
  }

  function handleChangePage(curPage) {
    setFilters({ ...filters, page: curPage });
  }

  return (
    <div className="content row gx-0 mt-3">
      <div className="col-2"></div>
      <div className="col-10">
        <div className="row gx-0 ">
          <div className="col-6"></div>
          <div className="col">
            <SearchForm
              onSearchClick={handleSearchClick}
              onClearClick={handleClearClick}
            />
          </div>
        </div>
        <div className="product-container ">
          <ProductList productList={productList} />
        </div>
        <div className="pagination d-flex justify-content-end p-4 ">
          <Pagination onPageChange={handleChangePage} numOfPages={numOfPages} />
        </div>
      </div>
    </div>
  );
}
