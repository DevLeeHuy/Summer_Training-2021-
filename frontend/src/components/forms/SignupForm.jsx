import React, { useState } from "react";
import userApi from "../../api/userApi";
import $ from "jquery";

export default function SignupForm({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  function onInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  function onFileChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const postData = new FormData();
    for (let key in formData) {
      postData.append(key, formData[key]);
    }
    try {
      const response = await userApi.register(postData);
      if (response.success) {
        $(".alert-success").fadeIn();
        setTimeout(() => {
          $(".alert-success").fadeOut();
          onRegisterSuccess();
        }, 3000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else console.log("Something was wrong🥲🥲" + err.message);
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      encType="multipart/form-data"
      className="text-center "
    >
      {/* 2 column grid layout with text inputs for the first and last names */}
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <input
              type="text"
              id="form3Example1"
              className="form-control"
              name="first_name"
              onChange={onInputChange}
            />
            <label className="form-label" htmlFor="form3Example1">
              First name
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <input
              type="text"
              id="form3Example2"
              className="form-control"
              name="last_name"
              onChange={onInputChange}
            />
            <label className="form-label" htmlFor="form3Example2">
              Last name
            </label>
          </div>
        </div>
      </div>
      {/* Email input */}
      <div className="form-outline mb-4">
        <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          onChange={onInputChange}
        />
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
      </div>
      {/* Phone input */}
      <div className="form-outline mb-4">
        <input
          type="number"
          id="phone"
          className="form-control"
          name="phone"
          onChange={onInputChange}
        />
        <label className="form-label" htmlFor="form3Example3">
          Phone Number
        </label>
      </div>

      {/* User input */}
      <div className="form-outline">
        <input
          type="text"
          id="formControlLg"
          name="username"
          className="form-control form-control-lg"
          onChange={onInputChange}
        />
        <label className="form-label" htmlFor="formControlLg">
          Username
        </label>
      </div>
      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form3Example4"
          className="form-control"
          name="password"
          onChange={onInputChange}
        />
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
      </div>
      {/* Picture upload */}
      <div className="form-group">
        <label className="form-label" htmlFor="customFile">
          You can add your profile picture here📷
        </label>
        <input
          type="file"
          className="form-control"
          name="picture"
          onChange={onFileChange}
        />
      </div>
      {/* Checkbox */}
      <div className="form-check d-flex justify-content-center m-4">
        <input
          className="form-check-input me-2"
          type="checkbox"
          defaultValue
          id="form2Example3"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="form2Example3">
          Subscribe to our newsletter
        </label>
      </div>
      {/* success alert */}

      <div
        className="alert alert-success position-absolute top-50 start-50 translate-middle text-center "
        style={{ display: "none" }}
        role="alert"
      >
        ✅✅Register successfully🙋‍♂️🙋‍♂️
      </div>

      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>Sign up</>
        )}
      </button>
      {/* Register buttons */}
      <div className="text-center">
        <p>or sign up with:</p>
        <button type="button" className="btn btn-primary btn-floating mx-1">
          <i className="fab fa-facebook-f" />
        </button>
        <button type="button" className="btn btn-primary btn-floating mx-1">
          <i className="fab fa-google" />
        </button>
        <button type="button" className="btn btn-primary btn-floating mx-1">
          <i className="fab fa-twitter" />
        </button>
        <button type="button" className="btn btn-primary btn-floating mx-1">
          <i className="fab fa-github" />
        </button>
      </div>
    </form>
  );
}
