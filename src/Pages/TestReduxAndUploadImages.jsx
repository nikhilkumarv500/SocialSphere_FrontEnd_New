import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useUpdateStore } from "../ReduxStores/UpdateStore";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteImageInUploadFolderByNameFunc, getAllImagesStoredInUploadFolderFunc } from "../services/Apis";

const TestReduxAndUploadImages = () => {
  const { setGlobalStore, setToastState } = useUpdateStore();
  const data = useSelector((state) => state);

  const [input,setInput] = useState("");

  const onPrint = () => {
    setToastState("Gone Gone Gone Gone Gone");
    console.log(data);
  };

  const onSave = () => {
    setGlobalStore({});
  };

  const onGetAllImagesStoredInUploadFolder = async () => {
    const res = await getAllImagesStoredInUploadFolderFunc();
    console.log(res);
  }

  const onDeleteImageInUploadFolderByName = async () => {
    const res = await deleteImageInUploadFolderByNameFunc(input);
    console.log(res);
  }

  return (
    <div>
      <Button variant="success" onClick={onPrint}>
        Print Data
      </Button>
      <Button variant="danger" onClick={onSave}>
        Save Data
      </Button>
      <Button variant="primary" onClick={onGetAllImagesStoredInUploadFolder}>
        Get all Images from folder/File
      </Button>
      <Button variant="danger" onClick={onDeleteImageInUploadFolderByName}>
        Delete Image in upload by ImageName
      </Button>
      <input style={{ border: "2px solid black" }} value={input} onChange={(e) => { setInput(e.target.value) }}></input>
    </div>
  );
};

export default TestReduxAndUploadImages;
// DATABASE = mongodb+srv://nikhilkumarv500:Password%402002@cluster0.ift898h.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Cluster0
