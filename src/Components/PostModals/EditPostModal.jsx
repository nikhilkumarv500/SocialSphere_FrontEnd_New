import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FileUpload } from "primereact/fileupload";
import { useSelector } from "react-redux";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import { newPostUploadFunc, postUpdateFunc } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import LoadingScreen from "../LoadingScreen/LoadingScreen"

const EditPostModal = ({ show, handleClose, description, post_image, id , post_image_url}) => {

    const [loading,setLoading] = useState(false);

  const fileUploadRef = useRef(null);

  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();

  // const prev ={
  //     ...userData,
  //     imagePreview: file.objectURL,
  //   }
  //   setGlobalStore(prev);

  const [enteredDescription, setDescription] = useState("");
  const [selectImage, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewComingFromEdit, setImagePreviewComingFromEdit] =
    useState("");

  useEffect(() => {
    setDescription(description);
    setImagePreviewComingFromEdit(post_image_url);
    // setImagePreviewComingFromEdit(post_image);
  }, []);

  const onImageUpload = ({ files }) => {
    const [file] = files;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    fileUploadRef.current.clear();
    setImagePreviewComingFromEdit(null);
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

  const handleEditPost = async () => {

    setLoading(true);

    let base64Image = null;
    if (selectImage) base64Image = await toBase64(selectImage);

    let newImageGettingAddedItem = {
      id: id,
      userName: userData.userName,
      email: userData.email,
      profile_image: userData.profile_image,

      post_name: enteredDescription,
      post_image: base64Image,
      originalFileName: selectImage?.name,
      description: enteredDescription,
      // likes: [
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg"
      //   },
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg"
      //   },
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg"
      //   },
      // ],
      // comments: [
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg",
      //       message: "Awesome"
      //   },
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg",
      //       message: "Awesome"
      //   },
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg",
      //       message: "Awesome"
      //   },
      //   {
      //       userName: "Nikhil",
      //       email: "n@gmail.com",
      //       profile_image: "generalPerson.jpeg",
      //       msg: "Awesome"
      //   },

      // ],
    };

    const jsonPayload = JSON.stringify(newImageGettingAddedItem);

    const res = await postUpdateFunc(jsonPayload);

    if (!res.status || res.status !== 200){ setLoading(false); setToastState({msg: "Could not edit your post", type: "danger"}); return; }

    newImageGettingAddedItem = {
      ...res.data,
    };

    const userPosts = userData.userPosts;

    const updatedUserPosts = userPosts.map((item) => {
        if (item._id === newImageGettingAddedItem._id) {
          return newImageGettingAddedItem;
        }
        return item;
      });

    const prev = {
      ...userData,
      userPosts:updatedUserPosts,
    };
    setGlobalStore(prev);

    handleClose();
    setDescription("");
    setSelectedFile(null);
    setImagePreviewComingFromEdit(null);
    setImagePreview(null);

    setToastState({msg: "Post updated successfully", type: "success"});
    setLoading(false);
  };

  return (
    <>
    <LoadingScreen loading={loading}/>
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setDescription("");
        setSelectedFile(null);
        setImagePreviewComingFromEdit(null);
        setImagePreview(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
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
              border: "1px solid black", // Black border
              padding: "0.5rem", // Add some padding
              marginTop: "0.5rem", // Add margin at the top
              marginBottom: "0.5rem", // Add margin at the bottom
              width: "100%", // Full width
              borderRadius: "4px", // Rounded corners
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
        {imagePreviewComingFromEdit && (
          <div style={{ marginTop: "1rem" }}>
            <img
              // src={`${BASE_URL}/uploads/${imagePreviewComingFromEdit}`}
              src={`${imagePreviewComingFromEdit}`}
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
            setImagePreviewComingFromEdit(null);
            setImagePreview(null);
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditPost}>
          Edit Post
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default EditPostModal;
