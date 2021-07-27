import React, { useCallback, useContext, useEffect, useState } from "react";
import { ProductListContext } from "../contexts/ProductListContext";
import { getProductImgUrl } from "../../configs/images";
import Pagination from "../partials/Pagination";

export default function ManageProduct() {
  const { productList } = useContext(ProductListContext);

  const styles = {
    tableFont: {
      fontSize: "18px",
    },
    icon: {
      fontSize: "20px",
    },
  };

  function getParent(ele, tagName) {
    while (ele?.tagName !== tagName) {
      ele = ele?.parentElement;
    }
    return ele;
  }
  function onRemoveClick(e) {
    const productId = getParent(e.target, "BUTTON").id;
  }

  return (
    <div className="container-fluid">
      <h1>Manage Products</h1>
      <div className="mt-4">
        <button
          className="btn btn-primary"
          data-mdb-toggle="modal"
          data-mdb-target="#addProductForm"
        >
          <i className="fas fa-plus me-1"></i>New
        </button>
        <AddProductForm />
        <table className="table" style={styles.tableFont}>
          <thead>
            <tr>
              <th>Product</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={getProductImgUrl(product.image)}
                    alt="Product img"
                    className="rounded img-thumbnail"
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    className="btn btn-success p-2 me-1"
                    style={styles.icon}
                    id={product._id}
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger p-2"
                    style={styles.icon}
                    id={product._id}
                    onClick={onRemoveClick}
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination d-flex justify-content-end p-4 ">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

function AddProductForm() {
  const [formData, setFormData] = useState({});
  console.log(formData);

  function onInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onFileChange(e) {
    const files = e.target.files;
    const file = files.length > 1 ? files : files[0];
    setFormData({ ...formData, [e.target.name]: file });
  }
  return (
    <div
      className="modal fade"
      id="addProductForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add product</h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span
                className="input-group-text bg-white text-dark border-0"
                id="name-addon"
              >
                Product name:
              </span>
              <input
                type="text"
                className="form-control rounded"
                placeholder="Product name"
                aria-label="Name"
                aria-describedby="name-addon"
                name="name"
                onChange={onInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <span
                className="input-group-text bg-white text-dark border-0"
                id="addon"
              >
                Category:
              </span>
              <input
                type="text"
                className="form-control rounded"
                placeholder="Product Category"
                aria-label="Category"
                aria-describedby="cate-addon"
                name="category"
                onChange={onInputChange}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group border-0">Description:</span>
              <textarea
                className="rounded"
                aria-label="With textarea"
                rows="4"
                cols="50"
                onChange={onInputChange}
                name="description"
              ></textarea>
            </div>

            <div className="input-group mb-3">
              <span className="input-group border-0" id="Price-addon">
                Price:
              </span>
              <input
                type="number"
                className="form-control rounded"
                placeholder="Product Price"
                aria-label="Price"
                aria-describedby="Price-addon"
                name="price"
                onChange={onInputChange}
              />
              <span className="input-group-text">$</span>
              <span className="input-group-text">0.00</span>
            </div>

            <div className=" mb-3">
              <label className="form-label" htmlFor="thumbnail">
                Product thumbnail:
              </label>
              <input
                type="file"
                className="form-control"
                id="thumbnail"
                name="thumbnail"
                onChange={onFileChange}
              />
            </div>
            <div className=" mb-3">
              <label className="form-label" htmlFor="images">
                Product images:
              </label>
              <input
                type="file"
                className="form-control"
                id="images"
                name="images"
                multiple
                onChange={onFileChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-mdb-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-light">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function editProductForm({ product }) {}
