import React from "react";
import LoadingButton from "../buttons/LoadingButton";

export default function ConfirmForm({ onConfirm, loading, title, message }) {
  async function onSaveClick() {
    await onConfirm();
    document.getElementById("close-confirm-btn").click();
  }
  return (
    <div
      className="modal fade"
      id="confirmForm"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-mdb-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              id="close-confirm-btn"
              type="button"
              className="btn btn-light"
              data-mdb-dismiss="modal"
            >
              Close
            </button>
            <LoadingButton
              loading={loading}
              type="button"
              className="btn btn-dark"
              onClick={onSaveClick}
            >
              Confirm{" "}
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
}
