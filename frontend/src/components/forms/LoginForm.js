import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import userApi from "../../api/userApi";
import { useHistory } from "react-router-dom";
import $ from "jquery";

export default function LoginForm(props) {
  //Router
  const history = useHistory();

  //User Context
  const { setCurUser } = useContext(UserContext);

  //Local state
  const [postData, setPostData] = useState({});

  //Error Messages
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }

  async function loginFormSubmit(e) {
    e.preventDefault();
    try {
      const response = await userApi.login(postData);
      if (response.success) {
        setCurUser(response.user); //Set user in context & local storage
        history.push("/"); //Go to homepage after login successfully
      } else {
        setErrorMessage(response.message);
        $(".error-message").fadeIn();
      }
    } catch (err) {
      console.log(err.res.message);
    }
  }
  return (
    <form className="login-form" onSubmit={loginFormSubmit} method="post">
      {/* Username input */}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example1"
          className="form-control"
          name="username"
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="form2Example1">
          User name
        </label>
      </div>
      {/* Password input */}
      <div className="form-outline mb-4">
        <input
          type="password"
          id="form2Example2"
          className="form-control"
          name="password"
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>
      {/* Error Messages */}
      <div
        className="alert alert-danger error-message text-center"
        style={{ display: "none" }}
        role="alert"
      >
        <i className="fas fa-exclamation-circle"></i>
        {errorMessage}
      </div>
      {/* 2 column grid layout for inline styling */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          {/* Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue
              id="form2Example3"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="form2Example3">
              {" "}
              Remember me{" "}
            </label>
          </div>
        </div>
        <div className="col">
          {/* Simple link */}
          <a href="#!">Forgot password?</a>
        </div>
      </div>
      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>
      {/* Register buttons */}
      <div className="text-center">
        <p>
          Not a member?{" "}
          <a href="#register" onClick={props.onRegisterClick}>
            Register
          </a>
        </p>
        <p>or sign in with:</p>
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
