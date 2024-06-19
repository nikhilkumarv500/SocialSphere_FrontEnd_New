import React, { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUpload } from "primereact/fileupload";
import { useSelector } from "react-redux";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import { newPostUploadFunc } from "../../services/Apis";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const NewPostModal = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const fileUploadRef = useRef(null);

  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();

  const [enteredDescription, setDescription] = useState("");
  const [selectImage, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onImageUpload = ({ files }) => {
    const [file] = files;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    fileUploadRef.current.clear();
  };

  const chooseOptions = {
    className: "custom-choose-btn  button-outlined",
    style: { height: "2.5rem" },
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAddPost = async () => {
    setLoading(true);

    let base64Image = null;
    if (selectImage) base64Image = await toBase64(selectImage);

    let newImageGettingAddedItem = {
      userName: userData.userName,
      email: userData.email,
      profile_image: userData.profile_image,

      post_name: enteredDescription,
      post_image: base64Image,
      originalFileName: selectImage?.name,
      description: enteredDescription,
      likes: [],
      comments: [],
    };

    const jsonPayload = JSON.stringify(newImageGettingAddedItem);

    const res = await newPostUploadFunc(jsonPayload);

    if (!res.status || res.status !== 200) {
      setLoading(false);
      setToastState({ msg: "Could not Create your post", type: "danger" });
      return;
    }

    newImageGettingAddedItem = {
      ...res.data,
    };

    const prev = {
      ...userData,
      userPosts: [
        {
          ...newImageGettingAddedItem,
        },
        ...userData.userPosts,
      ],
    };
    setGlobalStore(prev);

    handleClose();
    setDescription("");
    setSelectedFile(null);
    setImagePreview(null);

    setLoading(false);
    setToastState({ msg: "Post Created Successfully", type: "success" });
  };

  return (
    <>
      <LoadingScreen loading={loading} />
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setDescription("");
          setSelectedFile(null);
          setImagePreview(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Description:</label>
            <textarea
              value={enteredDescription}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              cols="50"
              style={{
                border: "1px solid black", 
                padding: "0.5rem", 
                marginTop: "0.5rem", 
                marginBottom: "0.5rem", 
                width: "100%", 
                borderRadius: "4px", 
              }}
            />
          </div>
          <div className="flex" style={{ marginTop: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "0.5rem" }}>Upload Image:</label>
            </div>
            <FileUpload
              className="custom-choose-btn"
              name="invoice"
              accept="image/*"
              customUpload
              uploadHandler={onImageUpload}
              mode="basic"
              auto={true}
              chooseLabel="Upload Image"
              chooseOptions={chooseOptions}
              ref={fileUploadRef}
            />
          </div>
          {imagePreview && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={imagePreview}
                alt="Image Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setDescription("");
              setSelectedFile(null);
              setImagePreview(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddPost}>
            Add Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewPostModal;
