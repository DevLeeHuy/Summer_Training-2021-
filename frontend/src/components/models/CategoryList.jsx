import React, { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { ProductListContext } from "../contexts/ProductListContext";

export default function CategoryList() {
  const { categoryList } = useContext(CategoryContext);
  return (
    <div className="list-group list-group-flush">
      {categoryList.map((ele, index) => (
        <Category item={ele} key={index} />
      ))}
    </div>
  );
}

function Category({ item }) {
  const { filters, setFilters } = useContext(ProductListContext);

  function categoryOnClick() {
    setFilters({ ...filters, category: item._id });
  }
  return (
    <div className="list-group-item p-0 ">
      <div className="  p-2 d-flex justify-content-around position-relative ripple">
        <div
          className=" w-100 d-flex justify-content-around category-item "
          onClick={categoryOnClick}
        >
          <span>{item.name}</span>
          {/* <span className=" badge badge-secondary round">142</span> */}
        </div>
        <span
          className="position-absolute list-btn ps-2 h-100 ripple"
          role="button"
          data-mdb-toggle="collapse"
          data-mdb-target={"#" + item.name}
          aria-expanded="false"
          aria-controls={item.name}
          style={{ right: "8px", top: "25%", borderLeft: "1px solid #ebebeb" }}
        >
          <i className="fas fa-list-ol"></i>
        </span>
      </div>
      <SubCategoryList subList={item.subCategory} parent={item.name} />
    </div>
  );
}

function SubCategoryList({ subList, parent }) {
  return (
    <div className="collapse subCategory-container" id={parent}>
      <ul className=" list-unstyled fw-normal pb-1 small mt-1 mb-0 ">
        {subList.map((ele, index) => (
          <li key={index} className="text-center  sidenav-item p-1 ">
            <SubCategory item={ele} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SubCategory({ item }) {
  const { filters, setFilters } = useContext(ProductListContext);
  function SubCategoryOnClick() {
    setFilters({ ...filters, subCategory: item._id });
  }
  return (
    <div className="subCategory-item ">
      <i className="fas fa-chevron-right" style={{ color: "#e0e0e0" }}></i>
      <span
        className="list-btn ps-2 ripple"
        style={{ borderBottom: "1px solid #ebebeb" }}
        onClick={SubCategoryOnClick}
      >
        {item.name}
      </span>
    </div>
  );
}
