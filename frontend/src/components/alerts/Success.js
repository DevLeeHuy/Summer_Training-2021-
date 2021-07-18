import React, { useState, useEffect } from "react";
import $ from "jquery";

export default function Success({ isSuccess }) {
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
          height: "100px",
          width: "100px",
          backgroundColor: "white",
          boxShadow: "3px 5px 5px #F2F2F2",
        }}
      >
        <i
          class="fas fa-check"
          style={{ fontSize: "50px", color: "#27CB75" }}
        ></i>
        <strong>Success</strong>
      </div>
    );
  else return null;
}
