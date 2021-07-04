import React, { useState, useContext } from "react";
import input from "../input_fields/input";
import { UserContext } from "../contexts/UserContext";

export default function LoginForm(props) {
  const testContext = useContext(UserContext);
  function loginFormSubmit(e) {
    e.preventDefault();
    testContext.setCurUser({
      name: "tu",
      pass: 1,
    });
  }
  return (
    <form className="login-form" onSubmit={loginFormSubmit} method="post">
      {/* Email input */}
      <div className="form-outline mb-4">
        <input
          type="text"
          id="form2Example1"
          className="form-control"
          name="username"
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
        />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
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
