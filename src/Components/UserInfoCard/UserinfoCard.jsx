import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import { BASE_URL } from "../../services/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { updateUserFunc } from "../../services/Apis";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
// import 'primeicons/primeicons.css';

const Card = () => {
  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userName: userData.userName || "",
    email: userData.email || "",
    user_description: userData.user_description || "",
  });

  const [loading, setLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [selectedImage , setSelectedImage] = useState(null);

  useEffect(() => {
    setImagePreviewUrl(`${BASE_URL}/uploads/${userData.profile_image}`);
  }, []);

  const fileUploadRef = useRef(null);

  const onImageUpload = ({ files }) => {
    const [file] = files;

    // const prev = {
    //   ...userData,
    //   imagePreview: file.objectURL,
    // };
    // setGlobalStore(prev);
    setSelectedImage(file);
    setImagePreviewUrl(file.objectURL);

    fileUploadRef.current.clear();
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const chooseOptions = {
    label: "Upload Profile Image",
    icon: "pi pi-fw pi-image",
    className: "custom-choose-btn",
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);  

    let base64Image = null;
    if (selectedImage) base64Image = await toBase64(selectedImage);

    const payload = {
      userName: formData.userName,
      email: formData.email,
      user_description: formData.user_description,
      profile_image: base64Image, 
      originalFileName: (typeof selectedImage !=='string' ? (selectedImage?.name || null) : null),
    };

    const jsonPayload = JSON.stringify(payload);

    const header = {
      "Content-Type": "application/json",
    };

    const res = await updateUserFunc(jsonPayload, header, userData.email);

    if(!res.status || res.status!==200)
    {
      setToastState({msg: "Couldnt modify your profile details", type: "danger"});
      return;
    }

    setGlobalStore({
      ...userData,
      userName: res.data.userName,
      email: res.data.email,
      user_description: res.data.user_description,
      profile_image: res.data.profile_image, 
    })

    setToastState({msg: "Your profile details modified successfully", type: "success"});
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setShowModal(false);
    setLoading(false);
  };

  const styles = {
    card: {
      textAlign: "center",
      padding: "20px",
      border: "2px solid white",
      borderRadius: "10px",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundImage: `url('${BASE_URL}/uploads/${userData.profile_image}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      margin: "0 auto 10px",
    },
    imagePreview: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      marginTop: "10px",
    },
    infoContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    followers: {
      color: "black",
    },
    connections: {
      color: "black",
    },
    name: {
      fontWeight: "bold",
      marginBottom: "10px",
    },
    email: {
      marginBottom: "10px",
    },
    description: {
      fontSize: "14px",
    },
    editButton: {
      position: "absolute",
      top: "10px",
      left: "10px",
      cursor: "pointer",
      fontSize: "1.2rem",
    },
    imageUploadContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "150px", 
    },
    imageUploadButton: {
      marginTop: "10px",
    },
  };

  return (
    <>
    <LoadingScreen loading={loading}/>
      {userData.email && (
        <div style={styles.card}>
          <FontAwesomeIcon
            icon={faEdit}
            style={styles.editButton}
            onClick={handleShowModal}
          />
          <div style={styles.profileImage}></div>
          <div style={styles.infoContainer}>
            <div style={styles.connections}>
              {`${(userData.connections || 0).length} connections`}
            </div>
            <div style={styles.followers}>
              {`${userData.followersCnt || 0} followers`}
            </div>
          </div>
          <div style={styles.name}>{userData.userName}</div>
          <div style={styles.email}>{userData.email}</div>
          <div style={styles.description}>{userData.user_description}</div>
        </div>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="formUserName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    disabled
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="user_description"
                    value={formData.user_description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} className="mb-3">
                <Form.Group controlId="formProfileImage">
                  <Form.Label>Profile Image</Form.Label>
                  <div style={styles.imageUploadContainer}>
                    {imagePreviewUrl && (
                      <Image
                        src={imagePreviewUrl}
                        style={styles.imagePreview}
                        alt="Profile Preview"
                      />
                    )}
                    <FileUpload
                      className="custom-choose-btn"
                      name="invoice"
                      accept="image/*"
                      customUpload
                      uploadHandler={onImageUpload}
                      mode="basic"
                      auto={true}
                      chooseLabel="Change Profile Image"
                      chooseOptions={chooseOptions}
                      ref={fileUploadRef}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
