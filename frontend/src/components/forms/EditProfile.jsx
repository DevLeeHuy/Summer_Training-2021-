import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function EditProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="edit-profile-container container mt-3 p-4">
      <div className="row">
        <h1 className="title">Edit your profile</h1>
        <div className="col-8">
          <ProfileInputField user={user} />
        </div>
        <div className="col">
          <ProfileImageField user={user} />
        </div>
      </div>
    </div>
  );
}

function ProfileInputField({ user }) {
  return (
    <div className="Input-container">
      <div className="row  mb-4">
        <div className="col ">
          <div class="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text " id="basic-addon1">
                First name:
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              defaultValue={user.firstname}
              placeholder="First name"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="col">
          <div class="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon2">
                Last name:
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              defaultValue={user.lastname}
              placeholder="Last name"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
      </div>
      {/* Email input */}
      <div class="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Email:
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          defaultValue={user.email}
          placeholder="Email address"
          aria-describedby="basic-addon3"
        />
      </div>
      {/* Phone input */}
      <div class="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon4">
            Phone Number:
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          defaultValue={user.phone}
          placeholder="Phone number"
          aria-describedby="basic-addon4"
        />
      </div>

      {/* User input */}
      <div class="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon5">
            Username:
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          defaultValue={user.username}
          placeholder="Username"
          aria-describedby="basic-addon5"
        />
      </div>
    </div>
  );
}

function ProfileImageField({ user }) {
  const IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;

  return (
    <div className="d-flex flex-column justify-content-between align-items-center">
      <img
        src={IMG_URL + user.picture}
        alt="pic"
        className="rounded-circle"
        height="150"
      />
      <div className="custom-file mt-3 w-75">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          style={{ cursor: "pointer" }}
        />

        <span>Maximum file size 1 MB Format: .JPEG, .PNG</span>
      </div>
    </div>
  );
}
