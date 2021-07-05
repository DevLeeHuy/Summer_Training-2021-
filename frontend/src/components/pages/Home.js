import React from "react";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import SearchForm from "../forms/SearchForm";
import ProductList from "../models/ProductList";
import Pagination from "../partials/Pagination";

const PAGE_SIZE = 6;

export default function Home(props) {
  const [productList, setProductList] = useState([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
    limit: PAGE_SIZE,
  });

  //Load all product to calculate number of pages
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll();
        setNumOfPages(Math.ceil(response.length / PAGE_SIZE));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  //Load product list by filter(page, search...)
  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getProducts(filters);
        setProductList(response);
      } catch (err) {
        console.log(err);
      }
    })(); //Filter change (search products, )
  }, [filters]); //filter products

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
