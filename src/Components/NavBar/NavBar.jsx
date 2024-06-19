import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();
  const navigate = useNavigate();

  const onLogout = () => {
    setGlobalStore({
      newUser: false,
      userName: "",
      email: "",
      profile_image: "",
      mobile: "",
      password: "",
      imagePreview: "/generalPerson.jpeg",
      imageFile: null,
      userPosts: [],
      connection: [],
      otherProfiles: [],
    });

    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarLogo}>
        <div style={styles.logoLink}>Social Sphere</div>
      </div>
      <div style={styles.navbarButtons}>
        {/* <Button style={styles.navbarButton} variant="dark" onClick={()=>{console.log(userData)}}>Login</Button> */}
        <Button
          style={styles.navbarButton}
          variant="dark"
          onClick={() => {
            onLogout();
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 2rem", 
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
  },
  navbarLogo: {
    fontSize: "1.5rem",
  },
  logoLink: {
    textDecoration: "none",
    color: "black",
  },
  navbarButtons: {
    display: "flex",
    gap: "1rem",
  },
  navbarButton: {
    fontSize: "1rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default NavBar;
