import React, { useState, useEffect } from "react";
import $ from "jquery";

export default function Success({ isSuccess, message }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!isSuccess) {
      $(".success").fadeOut(300);
    }
    let fadeOutTimeout = setTimeout(() => {
      setEnabled(isSuccess);
    }, 300);
    return () => {
      clearTimeout(fadeOutTimeout);
    };
  }, [isSuccess]);

  if (enabled)
    return (
      <div
        className="success alert position-absolute top-50 start-50 translate-middle text-center "
        role="alert"
        style={{
          minHeight: "100px",
          minWidth: "100px",
          maxHeight: "300px",
          maxWidth: "300px",
          backgroundColor: "white",
          boxShadow: "0px 5px 8px #cccccc",
          zIndex: "9999",
        }}
      >
        <i
          className="fas fa-check"
          style={{ fontSize: "50px", color: "#27CB75" }}
        ></i>
        <hr />
        <span>
          {message && message + " "}
          <strong>Success</strong>
        </span>
      </div>
    );
  else return null;
}
