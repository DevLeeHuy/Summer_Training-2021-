import React from "react";
import input from "../input_fields/input";

export default function SignupForm() {
  return (
    <form>
      {/* 2 column grid layout with text inputs for the first and last names */}
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <input type="text" id="form3Example1" className="form-control" />
            <label className="form-label" htmlFor="form3Example1">
              First name
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <input type="text" id="form3Example2" className="form-control" />
            <label className="form-label" htmlFor="form3Example2">
              Last name
            </label>
          </div>
        </div>
      </div>
      {/* Email input */}
      <div className="form-outline mb-4">
        <input type="email" id="form3Example3" className="form-control" />
        <label className="form-label" htmlFor="form3Example3">
          Email address
        </label>
      </div>
      {/* Password input */}
      <div className="form-outline mb-4">
        <input type="password" id="form3Example4" className="form-control" />
        <label className="form-label" htmlFor="form3Example4">
          Password
        </label>
      </div>
      {/* Checkbox */}
      <div className="form-check d-flex justify-content-center mb-4">
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
      {/* Submit button */}
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign up
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
