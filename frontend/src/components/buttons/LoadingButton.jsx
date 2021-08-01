import React from "react";

export default function LoadingButton({ children, loading, ...rest }) {
  return (
    <button {...rest}>
      {children}
      {loading && (
        <div
          className="spinner-border ms-2"
          role="status"
          style={{ width: "15px", height: "15px" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </button>
  );
}
