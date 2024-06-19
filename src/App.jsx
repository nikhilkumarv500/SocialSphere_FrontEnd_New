import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import PostPage from "./Pages/PostPage";
import Login from "./Pages/Login";
import Robot from "./Components/Robot";
import Test from "./Pages/TestReduxAndUploadImages";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateStore } from "./ReduxStores/UpdateStore";
import { useSelector } from "react-redux";
import HomePage from "./Pages/HomePage";
import BackGroundTest from "./Pages/BackGroundText";
import TestReduxAndUploadImages from "./Pages/TestReduxAndUploadImages";

function App() {
  // const setGlobalStore = useUpdateStore();
  const toastData = useSelector((state) => state.GlobalState.toast);

  //useEffect for toast
  useEffect(() => {
    if (toastData.show) {

      if(toastData.type==="danger")
      toast.error(toastData.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      else toast.success(toastData.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    }
  }, [toastData.show]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />


          <Route path="/i_dont_want_any_one_to_play_with_this_page/userApiTest" element={<RegisterPage />} />
          <Route path="/i_dont_want_any_one_to_play_with_this_page/postsApiTest" element={<PostPage />} />

          <Route path="/robot" element={<Robot />} />

          <Route path="/backTest" element={<BackGroundTest />} />

          <Route path="/i_dont_want_any_one_to_play_with_this_page/uploadImages" element={<TestReduxAndUploadImages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
