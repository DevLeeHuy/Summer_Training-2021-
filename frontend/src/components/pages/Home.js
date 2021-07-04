import React from "react";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import SearchForm from "../forms/SearchForm";
import ProductList from "../models/ProductList";

export default function Home(props) {
  const [productList, setProductList] = useState([]);
  const [filters, setFilters] = useState({});

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
      </div>
    </div>
  );
}
