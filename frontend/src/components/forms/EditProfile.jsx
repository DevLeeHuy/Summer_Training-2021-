import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import userApi from "../../api/userApi";
import $ from "jquery";
import Success from "../alerts/Success";

const IMG_URL = process.env.REACT_APP_USER_IMAGES_URL;

export default function EditProfile() {
  const { user, setCurUser } = useContext(UserContext);

  async function handleFormSubmit(formData, setSuccess) {
    const postData = new FormData();
    for (let key in formData) {
      postData.append(key, formData[key]);
    }
    try {
      const response = await userApi.update(postData, user._id);
      if (response.success) {
        setCurUser(response.user);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
      return null;
    } catch (err) {
      if (err.response) {
        return err.response.data.message;
      } else return "Something was wrong🥲🥲" + err.message;
    }
  }

  return (
    <div className="edit-profile-container  mt-3 p-4 ">
      <div className="row  position-relative">
        <Profile user={user} handleFormSubmit={handleFormSubmit} />
      </div>
      <hr />
      <div className="row p-4 position-relative ">
        <div>
          <PasswordInputField handleFormSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}

function Profile({ user, handleFormSubmit }) {
  const [formData, setFormData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState(IMG_URL + user.picture);
  const [saveSuccess, setSaveSuccess] = useState(false);

  function onInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onFileChange(e) {
    const [file] = e.target.files;
    file && setPreviewImg(URL.createObjectURL(file));
    setFormData({ ...formData, [e.target.name]: file });
  }

  async function onSaveClick() {
    setSaveLoading(true);
    await handleFormSubmit(formData, setSaveSuccess);
    setSaveLoading(false);
  }

  return (
    <div className="row">
      <Success isSuccess={saveSuccess} message="Edit profile " />
      <h1 className="title">💁‍♂️ Edit your profile</h1>
      <div className="col-lg-8 col-md-12">
        <ProfileInputField user={user} onInputChange={onInputChange} />
      </div>
      <div className="col-lg col-md">
        <ProfileImageField
          user={user}
          onFileChange={onFileChange}
          previewImg={previewImg}
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-success "
          onClick={onSaveClick}
          style={{ color: "white" }}
        >
          {saveLoading ? (
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
  );
}

function ProfileInputField({ user, onInputChange }) {
  return (
    <div className="Input-container">
      <div className="row  mb-4">
        <div className="col ">
          <div className="input-group ">
            <span className="input-group-text " id="basic-addon1">
              First name:
            </span>
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
            <span className="input-group-text" id="basic-addon2">
              Last name:
            </span>
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
        <span className="input-group-text" id="basic-addon3">
          Email:
        </span>
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
        <span className="input-group-text" id="basic-addon4">
          Phone Number:
        </span>
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
        <span className="input-group-text" id="basic-addon5">
          Username:
        </span>
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
      <div className="custom-file mt-3 w-75 text-center">
        <label className="form-label" htmlFor="customFile">
          Change your image:
        </label>
        <input
          type="file"
          name="picture"
          className="form-control"
          id="customFile"
          style={{ cursor: "pointer" }}
          onChange={onFileChange}
        />

        <p>Maximum file size 1 MB Format: .JPEG, .PNG</p>
      </div>
    </div>
  );
}

function PasswordInputField({ handleFormSubmit }) {
  const [formData, setFormData] = useState({
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);

  function handleValidation() {
    const error = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        error[key] = "Please input this field";
      } else if (key === "ConfirmPassword") {
        if (value !== formData.NewPassword)
          error[key] = "Confirm password is not match";
      }
    });
    setError(error);
    return Object.keys(error).length <= 0 ? true : false;
  }

  function onInputChange(e) {
    setError({});
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  async function onChangePwClick() {
    if (handleValidation()) {
      setLoading(true);
      const error = await handleFormSubmit(formData, setChangeSuccess);
      if (error) setError({ default: error });
      else
        setFormData({
          CurrentPassword: "",
          NewPassword: "",
          ConfirmPassword: "",
        });
      setLoading(false);
    }
  }

  return (
    <div className="row">
      <Success isSuccess={changeSuccess} message="Change password " />
      <h1 className="title">🗝️ Change password</h1>
      <div className="change-password-container container d-flex flex-column align-items-center justify-content-between ">
        {error.default && (
          <div className="alert alert-danger w-100" role="alert">
            {error.default}
          </div>
        )}
        <div className="form-outline ">
          <input
            type="password"
            id="CurPass"
            name="CurrentPassword"
            className="form-control border myInput "
            onChange={onInputChange}
            value={formData.CurrentPassword}
          />
          <label className="form-label" htmlFor="CurPass">
            Current password
          </label>
          {error.CurrentPassword && (
            <span className="text-danger p-2">
              <i className="fas fa-exclamation-circle"></i>{" "}
              {error.CurrentPassword}
            </span>
          )}
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="NewPass"
            name="NewPassword"
            className="form-control border myInput"
            onChange={onInputChange}
            value={formData.NewPassword}
          />
          <label className="form-label" htmlFor="NewPass">
            New Password
          </label>
          {error.NewPassword && (
            <span className="text-danger p-2">
              <i className="fas fa-exclamation-circle"></i> {error.NewPassword}
            </span>
          )}
        </div>
        <div className="form-outline">
          <input
            type="password"
            id="ConfirmPass"
            name="ConfirmPassword"
            className="form-control border myInput"
            onChange={onInputChange}
            value={formData.ConfirmPassword}
          />
          <label className="form-label" htmlFor="ConfirmPass">
            Confirm new password
          </label>
          {error.ConfirmPassword && (
            <span className="text-danger p-2">
              <i className="fas fa-exclamation-circle"></i>{" "}
              {error.ConfirmPassword}
            </span>
          )}
        </div>
        <button className="btn btn-info  mt-3" onClick={onChangePwClick}>
          CHANGE{" "}
          {loading && (
            <div className="spinner-grow spinner-grow-sm" role="status"></div>
          )}
        </button>
      </div>
    </div>
  );
}
