import React from "react";
import { useState, useEffect } from "react";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import { useLocation } from "react-router-dom";

export default function Signin_signup() {
  const curPage = +useQuery().get("page");
  const [page, setPage] = useState(curPage);

  useEffect(() => {
    setPage(curPage);
  }, [curPage]); //Handle navbar signin/signup click

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const DisplayPage = () => {
    if (page === 0) return <LoginForm onRegisterClick={onRegisterClick} />;
    return <SignupForm />;
  };
  const onLoginClick = () => {
    page === 1 && setPage(0);
  };
  const onRegisterClick = () => {
    page === 0 && setPage(1);
  };

  return (
    <div
      className="account-container container w-25 mt-4"
      style={{ height: "800px" }}
    >
      <h1>Sign in / sign up FUNCTION</h1>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={"nav-link " + (page === 0 && "active")}
            onClick={onLoginClick}
            id="tab-login"
            data-mdb-toggle="pill"
            href="#login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={"nav-link " + (page === 1 && "active")}
            onClick={onRegisterClick}
            id="tab-register"
            data-mdb-toggle="pill"
            href="#register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </a>
        </li>
      </ul>
      <DisplayPage />
    </div>
  );
}
