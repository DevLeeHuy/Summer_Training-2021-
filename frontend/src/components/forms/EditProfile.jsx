import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import userApi from "../../api/userApi";
import $ from "jquery";
import Success from "../alerts/Success";

const IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;

export default function EditProfile() {
  const { user, setCurUser } = useContext(UserContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(IMG_URL + user.picture);
  const [isSuccess, setIsSuccess] = useState(false);

  function onInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onFileChange(e) {
    const [file] = e.target.files;
    file && setPreviewImg(URL.createObjectURL(file));
    setFormData({ ...formData, [e.target.name]: file });
  }

  async function handleFormSubmit() {
    setLoading(true);
    const postData = new FormData();
    for (let key in formData) {
      postData.append(key, formData[key]);
    }

    try {
      const response = await userApi.update(postData, user._id);
      if (response.success) {
        setCurUser(response.user);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.message);
      } else console.log("Something was wrong🥲🥲" + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="edit-profile-container container mt-3 p-4 position-relative">
      <Success isSuccess={isSuccess} message="Edit profile " />
      <div className="row">
        <h1 className="title">Edit your profile</h1>
        <div className="col-8">
          <ProfileInputField user={user} onInputChange={onInputChange} />
        </div>
        <div className="col">
          <ProfileImageField
            user={user}
            onFileChange={onFileChange}
            previewImg={previewImg}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-5"></div>
        <div className="col">
          <button
            className="btn btn-success buttonload"
            onClick={handleFormSubmit}
            style={{ color: "white" }}
          >
            {loading ? (
              <>
                <div className="spinner-border text-light " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              <>Save</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileInputField({ user, onInputChange }) {
  return (
    <div className="Input-container">
      <div className="row  mb-4">
        <div className="col ">
          <div className="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text " id="basic-addon1">
                First name:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              defaultValue={user.firstname}
              placeholder="First name"
              aria-describedby="basic-addon1"
              name="firstname"
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="col">
          <div className="input-group ">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon2">
                Last name:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              defaultValue={user.lastname}
              placeholder="Last name"
              aria-describedby="basic-addon2"
              name="lastname"
              onChange={onInputChange}
            />
          </div>
        </div>
      </div>
      {/* Email input */}
      <div className="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon3">
            Email:
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          defaultValue={user.email}
          placeholder="Email address"
          aria-describedby="basic-addon3"
          name="email"
          onChange={onInputChange}
        />
      </div>
      {/* Phone input */}
      <div className="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon4">
            Phone Number:
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          defaultValue={user.phone}
          placeholder="Phone number"
          aria-describedby="basic-addon4"
          name="phone"
          onChange={onInputChange}
        />
      </div>

      {/* User input */}
      <div className="input-group  mb-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon5">
            Username:
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          defaultValue={user.username}
          placeholder="Username"
          aria-describedby="basic-addon5"
          disabled
        />
      </div>
    </div>
  );
}

function ProfileImageField({ onFileChange, previewImg }) {
  return (
    <div className="d-flex flex-column justify-content-between align-items-center">
      <img src={previewImg} alt="pic" className="rounded-circle" height="150" />
      <div className="custom-file mt-3 w-75">
        <input
          type="file"
          name="picture"
          className="custom-file-input"
          id="customFile"
          style={{ cursor: "pointer" }}
          onChange={onFileChange}
        />

        <span>Maximum file size 1 MB Format: .JPEG, .PNG</span>
      </div>
    </div>
  );
}
