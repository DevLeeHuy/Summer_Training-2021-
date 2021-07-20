import React from "react";

export default function ConfirmShipping({
  id,
  confirm,
  pending,
  user,
  onAddressChange,
}) {
  return (
    <div
      className="modal right fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-mdb-backdrop="true"
      data-mdb-keyboard="true"
    >
      <div className="modal-dialog modal-side modal-bottom-right ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              CONFIRM
            </h5>
            <button
              type="button"
              className="btn-close close-confirm-shipping"
              data-mdb-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* <div className="input-group  mb-4">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon5">
                  Address:
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                defaultValue={user.addresses[0]}
                placeholder="Input shipping address"
                aria-describedby="basic-addon5"
              />
            </div> */}
            <p className="note note-light">
              <strong>Note:</strong> Please double check the products you have
              selected and make sure you intend to buy them✅
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-mdb-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#2ad65b" }}
              onClick={confirm}
            >
              {pending ? (
                <>
                  Pending...
                  <div
                    className="spinner-border text-light "
                    role="status"
                    style={{ width: "1rem", height: "1rem" }}
                  >
                    <span className="visually-hidden"> Pending...</span>
                  </div>
                </>
              ) : (
                <>I'm sure👌</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
