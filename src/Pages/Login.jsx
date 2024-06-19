import React,{ useState } from "react";
import LoginBackGround from "../Components/LoginBackGround/LoginBackGround";
import LoginForm from "../Components/LoginForm/LoginForm";


export default function Login() {


  return (
    <>
      <LoginBackGround refresh={`hjbd56ve67evfh`}/>

      <div
        style={{
          position: "absolute",
          zIndex: 1,
          width: "50%",
          height: "100vh",
          // backgroundColor: "black",
        }}
      >
        <LoginForm />
      </div>
    </>
  );
}
