import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import {
  getAllPostsFunc,
  getAllUsersFunc,
  getFollowersAccountDetailsFunc,
  getPostsByEmailFunc,
  getSingleUserFunc,
  loginUserFunc,
  registerfunc,
} from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectImage, onSelectImage] = useState(null);

  const userData = deepClone(useSelector((state) => state.GlobalState.data));

  const { setGlobalStore, setToastState } = useUpdateStore();
  const navigate = useNavigate();

  const fileUploadRef = useRef(null);

  const onImageUpload = ({ files }) => {
    const [file] = files;

    const prev = {
      ...userData,
      imagePreview: file.objectURL,
    };
    setGlobalStore(prev);
    onSelectImage(file);

    fileUploadRef.current.clear();
  };

  const chooseOptions = {
    className: "custom-choose-btn  button-outlined",
    style: { height: "2.5rem" },
  };

  const onLogin = async () => {
    setLoading(true);

    const payload = {
      email: userData.email,
      password: userData.password,
    };
    const jsonPayload = JSON.stringify(payload);

    const header = {
      "Content-Type": "application/json",
    };

    const res = await loginUserFunc(jsonPayload, header);

    if (!!res.data) {
      const res = await getSingleUserFunc(userData.email);
      const userPosts = await getAllPostsFunc();
      const friends = await getFollowersAccountDetailsFunc({
        emailParam: userData.email,
      });

      let otherProfiles = await getAllUsersFunc();
      otherProfiles = (otherProfiles.data || []).filter(
        (item) => item.email !== userData.email
      );

      otherProfiles = otherProfiles.filter((item) => {
        const conn = res.data.connections;

        for (let j = 0; j < conn.length; j++) {
          if (conn[j].email === item.email) return false;
        }

        return true;
      });

      setGlobalStore({
        ...res.data,
        ...friends.data,
        userPosts: userPosts.data || [],
        otherProfiles: otherProfiles,
      });

      navigate("/home");
      setToastState({ msg: "Login successful", type: "success" });
    } else {
      setToastState({
        msg: res?.response?.data?.errorMsg || "Invalid Credentials",
      });
    }
    setLoading(false);
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onSignUp = async () => {
    setLoading(true);

    let base64Image = null;
    if (selectImage) base64Image = await toBase64(selectImage);

    const payload = {
      userName: userData.userName,
      email: userData.email,
      mobile: userData.mobile,
      password: userData.password,
      profile_image: base64Image,
      originalFileName: selectImage?.name || null,
    };

    const jsonPayload = JSON.stringify(payload);

    const header = {
      "Content-Type": "application/json",
    };

    const res = await registerfunc(jsonPayload, header);

    if (!!res.data) {
      const res2 = await getSingleUserFunc(userData.email);
      let otherProfiles = await getAllUsersFunc();
      otherProfiles = otherProfiles.data.filter(
        (item) => item.email !== userData.email
      );

      const userPosts = await getAllPostsFunc();

      setGlobalStore({
        ...res2.data,
        userPosts: [],
        otherProfiles: otherProfiles,
        userPosts: userPosts.data || [],
      });
      setToastState({ msg: "Signup successful", type: "success" });
      navigate("/home");
    } else {
      setToastState({
        msg: res?.response?.data || "Invalid Credential Format",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <LoadingScreen loading={loading} />
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-6">
              <div className="card rounded-3 text-black">
                <div className="">
                  <div className="card-body p-md-5">
                    <div className="text-center">
                      <div className="flex justify-center">
                        <img
                          src="/appLogo.png"
                          style={{ width: "125px" }}
                          alt="logo"
                        />
                      </div>
                      <h4 className="mt-1 mb-5 pb-1">
                        Welcome to SocialSphere
                      </h4>
                    </div>

                    <form>
                      {!userData.newUser && <p>Please login to your account</p>}
                      {userData.newUser && (
                        <p>Please create a new account</p>
                      )}

                      {userData.newUser && (
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="text"
                            id="form1Example11"
                            className="form-control"
                            placeholder="Username"
                            value={userData.userName}
                            onChange={(e) => {
                              userData.userName = e.target.value;
                              setGlobalStore({ ...userData });
                            }}
                          />
                        </div>
                      )}

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id={`form2Example11${
                            userData.newUser ? "1" : "2"
                          }`}
                          key={`form2Example11${
                            userData.newUser ? "1" : "2"
                          }`}
                          className="form-control"
                          placeholder="Email"
                          value={userData.email}
                          onChange={(e) => {
                            userData.email = e.target.value;
                            setGlobalStore({ ...userData });
                          }}
                        />
                      </div>

                      {userData.newUser && (
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input
                            type="text"
                            id="form3Example11"
                            className="form-control"
                            placeholder="Mobile no"
                            value={userData.mobile}
                            onChange={(e) => {
                              userData.mobile = e.target.value;
                              setGlobalStore({ ...userData });
                            }}
                          />
                        </div>
                      )}

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          key={`form4Example22${
                            userData.newUser ? "1" : "2"
                          }`}
                          id={`form4Example22${
                            userData.newUser ? "1" : "2"
                          }`}
                          className="form-control"
                          placeholder="Password"
                          value={userData.password}
                          onChange={(e) => {
                            userData.password = e.target.value;
                            setGlobalStore({ ...userData });
                          }}
                        />
                      </div>

                      {userData.newUser && (
                        <div className="d-flex align-items-center mb-4 p-1">
                          <FileUpload
                            className="custom-choose-btn"
                            name="invoice"
                            accept="image/*"
                            customUpload
                            uploadHandler={onImageUpload}
                            mode="basic"
                            auto={true}
                            chooseLabel="Upload Profile Image"
                            chooseOptions={chooseOptions}
                            ref={fileUploadRef}
                          />
                          <Tooltip
                            target=".custom-choose-btn"
                            content="No need to upload"
                            position="bottom"
                          />

                          <img
                            src={userData.imagePreview}
                            style={{
                              width: "45px",
                              height: "45px",
                              border: "1px solid black",
                              borderRadius: "50%",
                              marginLeft: "10px",
                            }}
                            alt="logo"
                          />

                          {userData.imagePreview !== "/generalPerson.jpeg" && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const prev = {
                                  ...userData,
                                  imagePreview: "/generalPerson.jpeg",
                                };
                                onSelectImage(null);

                                setGlobalStore(prev);
                              }}
                              style={{ width: "20px" }}
                              className="hover:text-red-600 text-red-400"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                fill="currentColor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}

                      <div className="d-flex justify-content-center pt-1 mb-5 pb-1">
                        <div className="w-100 text-center">
                          {!userData.newUser && (
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2"
                              type="button"
                              onClick={onLogin}
                            >
                              Log in
                            </button>
                          )}
                          {userData.newUser && (
                            <button
                              data-mdb-button-init
                              data-mdb-ripple-init
                              className="btn btn-primary btn-block fa-lg gradient-custom-2"
                              type="button"
                              onClick={onSignUp}
                            >
                              Create
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        {!userData.newUser && (
                          <p className="mb-0 me-2">Don't have an account?</p>
                        )}
                        {userData.newUser && (
                          <p className="mb-0 me-2">Already have an account?</p>
                        )}
                        {!userData.newUser && (
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                            onClick={() => {
                              setGlobalStore({
                                newUser: true,
                                imagePreview: "/generalPerson.jpeg",
                              });
                              onSelectImage(null);
                            }}
                          >
                            Create new
                          </button>
                        )}
                        {userData.newUser && (
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-danger"
                            onClick={() => {
                              setGlobalStore({
                                newUser: false,
                                imagePreview: "/generalPerson.jpeg",
                              });
                              onSelectImage(null);
                            }}
                          >
                            Login
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
