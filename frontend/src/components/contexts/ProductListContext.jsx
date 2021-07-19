import React, { useState, useEffect, createContext } from "react";
import productApi from "../../api/productApi";

export const ProductListContext = createContext();

const PAGE_SIZE = 6;
const DEFAULT_FILTERS = {
  page: 1,
  limit: PAGE_SIZE,
};

export default function ProductListContextProvider(props) {
  const [productList, setProductList] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

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
    return () => {
      setNumOfPages(0);
    };
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
    return () => {
      setProductList([]);
    };
  }, [JSON.stringify(filters)]); //filter products

  const setDefaultFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const ProductListData = {
    productList,
    numOfPages,
    filters,
    setFilters,
    setDefaultFilters,
  };
  return (
    <ProductListContext.Provider value={ProductListData}>
      {props.children}
    </ProductListContext.Provider>
  );
}
