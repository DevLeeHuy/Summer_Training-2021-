import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductListContext } from "../contexts/ProductListContext";
import { getProductImgUrl } from "../../configs/images";
import Pagination from "../partials/Pagination";
import productApi from "../../api/productApi";
import ConfirmForm from "../forms/ConfirmForm";
import Validator from "../../vendor/validator";
import { CategoryContext } from "../contexts/CategoryContext";
import Success from "../alerts/Success";
import LoadingButton from "../buttons/LoadingButton";
import categoryApi from "../../api/categoryApi";

export default function ManageProduct() {
  const { productList, refreshProductList } = useContext(ProductListContext);
  const [removeId, setRemoveId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    isSuccess: false,
    message: "",
  });

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
    setRemoveId(productId);
  }

  function handleSuccess(message) {
    setStatus({
      isSuccess: true,
      message,
    });
    setTimeout(() => {
      setStatus({
        isSuccess: false,
      });
    }, 2000);
    refreshProductList();
  }

  async function handleRemove() {
    setLoading(true);
    try {
      const res = await productApi.remove(removeId);
      if (res.success) {
        handleSuccess("Remove product");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  async function handleAdd(formData) {
    try {
      const res = await productApi.add(formData);
      if (res.success) {
        handleSuccess("Add product");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdate(formData, id) {
    try {
      const res = await productApi.update(formData, id);
      if (res.success) {
        handleSuccess("Update product");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container-fluid position-relative">
      <Success isSuccess={status.isSuccess} message={status.message} />
      <h1>Manage Products</h1>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary"
            data-mdb-toggle="modal"
            data-mdb-target="#addProductForm"
          >
            <i className="fas fa-plus me-1"></i>New
          </button>
          <button
            className="btn btn-warning p-2"
            data-mdb-toggle="modal"
            data-mdb-target="#editCategoryForm"
          >
            <span className="me-1" style={{ fontSize: "18px" }}>
              ⚙️
            </span>
            Category
          </button>
        </div>
        <ProductForm action="add" handleAdd={handleAdd} />{" "}
        {/*Add product form*/}
        <EditCategoryForm />
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
                <td className="p-1">
                  <img
                    src={getProductImgUrl(product.image.thumbnail)}
                    alt="Product img"
                    className="rounded img-thumbnail "
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
                    data-mdb-toggle="modal"
                    data-mdb-target={`#id-${product._id}`}
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-danger p-2"
                    style={styles.icon}
                    id={product._id}
                    onClick={onRemoveClick}
                    data-mdb-toggle="modal"
                    data-mdb-target="#confirmForm"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal for edit product */}
        {productList.map((product, index) => {
          const newProduct = { ...product };
          newProduct.category = product.category._id;
          return (
            <ProductForm
              key={index}
              product={newProduct}
              action="edit"
              handleUpdate={handleUpdate}
            />
          );
        })}
        <ConfirmForm
          onConfirm={handleRemove}
          title="Delete product 🗑️"
          message="Are you sure🤔 ?"
          loading={loading}
        />
        {/* Pagination */}
        <div className="pagination d-flex justify-content-end p-4 ">
          <Pagination />
        </div>
      </div>
    </div>
  );
}

function ProductForm({ product, action, handleAdd, handleUpdate }) {
  const { categoryList, getCategoryList } = useContext(CategoryContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const inputAddCategory = useRef(null);
  const inputAddSubCategory = useRef(null);

  //Find parent category to put in text box for update form
  useEffect(() => {
    if (action === "edit") {
      if (categoryList.length > 0) {
        const parentCategory = categoryList.find(
          (category) =>
            category.subCategory.find((sub) => sub._id === product.category) ||
            category._id === product.category
        )?._id;
        const category = categoryList.find(
          (cate) => cate._id === product.category
        );
        setFormData({
          ...formData,
          parentCategory,
          category: category ? "" : product.category,
        });
      }
    }
  }, [categoryList]);

  //Validate form before submit
  useEffect(() => {
    Validator(".validate-form");
  }, []);

  function onInputChange(e) {
    // console.log(`${[e.target.name]}: ${e.target.value}`);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onFileChange(e) {
    const files = e.target.files;
    const file = files.length > 1 ? files : files[0];
    setFormData({ ...formData, [e.target.name]: file });
  }

  async function onSubmitClick(e) {
    setLoading(true);
    const postData = new FormData();
    for (let key in formData) {
      if (key === "images") {
        for (let image of formData[key]) {
          postData.append("images", image);
        }
      } else if (!formData[key]) {
      } else postData.append(key, formData[key]);
    }
    if (e.target.valid)
      if (action === "add" || !product) {
        await handleAdd(postData);
        setFormData({});
      } else {
        console.log(formData);
        await handleUpdate(postData, product._id);
      }
    else console.log("Loi r nha con");
    setLoading(false);
  }

  async function handleAddCategory() {
    const category = inputAddCategory.current.value;
    if (category) {
      try {
        const res = await categoryApi.add({ name: category });
        await getCategoryList();
        setFormData({
          ...formData,
          parentCategory: res.newCategory._id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function handleAddSubCategory() {
    const subCategory = inputAddSubCategory.current.value;
    if (subCategory) {
      try {
        const parentCategoryId = formData.parentCategory;
        const res = await categoryApi.add({
          name: subCategory,
          parentCategoryId,
        });
        await getCategoryList();
        setFormData({
          ...formData,
          category: res.newCategory._id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div
      className="modal fade"
      id={product ? `id-${product._id}` : "addProductForm"}
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

          <form className="validate-form" onSubmit={onSubmitClick}>
            <div className="modal-body">
              <div className="form-group mb-3">
                <span className="input-group border-0" id="name-addon">
                  Product name:{" "}
                </span>
                <input
                  type="text"
                  className="form-control rounded"
                  placeholder="Product name"
                  rules="isRequired"
                  aria-label="Name"
                  aria-describedby="name-addon"
                  name="name"
                  onChange={onInputChange}
                  value={formData.name || product?.name || ""}
                />
                <span className="error-control"></span>
              </div>
              <div className="form-group mb-3">
                <span className="input-group  border-0" id="addon">
                  Category:
                </span>
                <div className="row">
                  <div className="col ">
                    <select
                      className="form-select"
                      name="parentCategory"
                      aria-label="Default select example"
                      onChange={onInputChange}
                      rules="isRequired"
                      value={formData.parentCategory || ""}
                    >
                      <option>Select main category</option>
                      {categoryList.map((category, index) => (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <div className="input-group mb-1 mt-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add category"
                        aria-label="Add category"
                        aria-describedby="add-cate"
                        ref={inputAddCategory}
                      />
                      <button
                        className="btn btn-outline-primary p-1"
                        type="button"
                        id="add-cate"
                        data-mdb-ripple-color="dark"
                        onClick={handleAddCategory}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    {formData.parentCategory && (
                      <>
                        <select
                          className="form-select"
                          name="category"
                          aria-label="Default select example"
                          onChange={onInputChange}
                          rules="isRequired"
                          value={formData.category || ""}
                        >
                          <option>Select child category</option>

                          {categoryList
                            .find(
                              (cate) => cate._id === formData.parentCategory
                            )
                            ?.subCategory.map((category, index) => (
                              <option key={index} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                        <div className="input-group mb-1 mt-1">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add sub category"
                            aria-label="Add sub category"
                            aria-describedby="add-sub-cate"
                            ref={inputAddSubCategory}
                          />
                          <button
                            className="btn btn-outline-primary p-1"
                            type="button"
                            id="add-sub-cate"
                            data-mdb-ripple-color="dark"
                            onClick={handleAddSubCategory}
                          >
                            Add
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <span className="error-control"></span>
              </div>
              <div className="form-group mb-3">
                <span className="input-group border-0">Description:</span>
                <textarea
                  className="rounded"
                  aria-label="With textarea"
                  rows="4"
                  cols="50"
                  name="description"
                  onChange={onInputChange}
                  value={formData.description || product?.description || ""}
                ></textarea>
              </div>

              <div className="form-group mb-3">
                <span className="input-group border-0" id="Price-addon">
                  Price:
                </span>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control rounded"
                    placeholder="Product Price"
                    aria-label="Price"
                    aria-describedby="Price-addon"
                    name="price"
                    onChange={onInputChange}
                    rules="isRequired"
                    value={formData.price || product?.price || ""}
                  />
                  <span className="input-group-text">$</span>
                  <span className="input-group-text">0.00</span>
                </div>
                <span className="error-control"></span>
              </div>

              <div className=" mb-3">
                <label className="form-label" htmlFor="thumbnail">
                  Product thumbnail:
                </label>
                {/* Render review product thumbnail */}
                {(formData.thumbnail || product) && (
                  <img
                    src={
                      formData.thumbnail
                        ? URL.createObjectURL(formData.thumbnail)
                        : getProductImgUrl(product.image.thumbnail)
                    }
                    className="ms-2 mb-2"
                    style={{ width: "100px", height: "100px" }}
                    alt="Product thumbnail"
                  />
                )}

                <input
                  type="file"
                  className="form-control"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={onFileChange}
                />
              </div>
              <div className=" mb-3">
                <label className="form-label me-3" htmlFor="images">
                  Product images:
                </label>
                <div className="d-flex flex-wrap">
                  {/* Render review product images */}
                  {(formData.images || product) &&
                    (formData.images
                      ? Array.from(formData.images).map((img, key) => (
                          <img
                            key={key}
                            className="me-2 mb-2"
                            src={URL.createObjectURL(img)}
                            style={{ width: "100px", height: "100px" }}
                            alt="Product images"
                          />
                        ))
                      : product.image.photos.map((photo, key) => (
                          <img
                            className="me-2 mb-2"
                            key={key}
                            src={getProductImgUrl(photo)}
                            style={{ width: "100px", height: "100px" }}
                            alt="Product images"
                          />
                        )))}
                </div>
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

              <LoadingButton
                type="submit"
                className="btn btn-light"
                loading={loading}
              >
                {product ? "Save changes" : "Add product"}
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function EditCategoryForm() {
  const { categoryList, getCategoryList } = useContext(CategoryContext);
  const [changeData, setChangeData] = useState({});
  const [loading, setLoading] = useState(false);

  //Get value and fill into input fields
  useEffect(() => {
    setChangeData(
      categoryList.reduce(
        (acc, parentCate) =>
          Object.assign(
            {
              ...acc,
              [parentCate._id]: parentCate.name,
            },
            parentCate.subCategory.reduce(
              (acc, cate) => ({
                ...acc,
                [cate._id]: cate.name,
              }),
              {}
            )
          ),
        {}
      )
    );
  }, [categoryList]);

  const onChangeData = (e) => {
    setChangeData({
      ...changeData,
      [e.target.id]: e.target.value,
    });
  };

  async function process(e, handle) {
    setLoading(true);
    await handle(e);
    getCategoryList();
    setLoading(false);
  }

  const handleUpdate = async (e) => {
    const categoryId = e.target.getAttribute("categoryid");
    const parentCategoryId = e.target.getAttribute("ofcategoryid");
    const name = changeData[categoryId];
    try {
      await categoryApi.update({
        categoryId,
        parentCategoryId,
        name,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (e) => {
    const categoryId = e.target.getAttribute("categoryid");
    const parentCategoryId = e.target.getAttribute("ofcategoryid");
    try {
      await categoryApi.remove({ categoryId, parentCategoryId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddSubCategory = async (e) => {
    const parentCategoryId = e.target.getAttribute("ofcategoryid");
    try {
      await categoryApi.add({
        name: changeData[`${parentCategoryId}-newSubCategory`],
        parentCategoryId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddParentCategory = async () => {
    try {
      await categoryApi.add({
        name: changeData["newParentCategory"],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="modal fade"
      id="editCategoryForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-xl-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit category</h5>
            {loading && (
              <div className="spinner-border ms-2 text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <button
              type="button"
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body row">
            {categoryList?.map((parentCate, index) => (
              <div key={index} className="mb-3 col-lg-4 col-md-6 col-sm-12">
                <div className="input-group">
                  <span>{index + 1}.</span>
                  <input
                    className="ms-4 form-control"
                    type="text"
                    id={parentCate._id}
                    onChange={onChangeData}
                    value={changeData[parentCate._id] || ""}
                  />
                  <button
                    className="btn btn-info p-1 ms-1 me-1"
                    categoryid={parentCate._id}
                    onClick={(e) => process(e, handleUpdate)}
                  >
                    Change
                  </button>
                  <button
                    className="btn btn-danger p-1"
                    categoryid={parentCate._id}
                    onClick={(e) => process(e, handleDelete)}
                  >
                    Delete
                  </button>
                </div>
                <ul>
                  {parentCate.subCategory?.map((cate, index) => (
                    <li key={index} className="mt-2 list-unstyled input-group">
                      <span className="ps-2"> |____ </span>
                      <input
                        type="text"
                        className="form-control"
                        id={cate._id}
                        onChange={onChangeData}
                        value={changeData[cate._id] || ""}
                      />
                      <button
                        className="btn btn-info p-1 ms-1 me-1"
                        ofcategoryid={parentCate._id}
                        categoryid={cate._id}
                        onClick={(e) => process(e, handleUpdate)}
                      >
                        Change
                      </button>
                      <button
                        className="btn btn-danger p-1"
                        ofcategoryid={parentCate._id}
                        categoryid={cate._id}
                        onClick={(e) => process(e, handleDelete)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                  <li className="mt-2 list-unstyled input-group">
                    <span className="ps-2"> |____ </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New sub category"
                      id={`${parentCate._id}-newSubCategory`}
                      onChange={onChangeData}
                      value={
                        changeData[`${parentCate._id}-newSubCategory`] || ""
                      }
                    />
                    <button
                      className="btn btn-success p-1 ms-1"
                      ofcategoryid={parentCate._id}
                      onClick={(e) => process(e, handleAddSubCategory)}
                    >
                      Add
                    </button>
                  </li>
                </ul>
              </div>
            ))}
            <div className="mb-3 col-lg-4 col-md-6 col-sm-12">
              <div className="input-group">
                <span>{categoryList.length + 1}.</span>
                <input
                  className="ms-4 form-control"
                  type="text"
                  placeholder="New category"
                  id="newParentCategory"
                  onChange={onChangeData}
                  value={changeData["newParentCategory"] || ""}
                />
                <button
                  className="btn btn-success p-1 ms-1 "
                  onClick={(e) => process(e, handleAddParentCategory)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
