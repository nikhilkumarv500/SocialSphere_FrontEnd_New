// import { Button } from 'primereact/button';   
import { Button, Form } from 'react-bootstrap';
import { FileUpload } from 'primereact/fileupload';
import React, {useState, useEffect} from 'react';
import { getAllUsersFunc, registerfunc, getSingleUserFunc, updateUserFunc, deleteUserFunc, loginUserFunc, deleteAllUserCollectionFunc, deleteAllUserPasswordControllerFunc } from '../services/Apis';
import { BASE_URL } from '../services/helper';

function RegisterPage() {


  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [input, setInput] = useState("");
  const [imageFromApi, setImageFromApi] = useState("");

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const onPublishUser = async() =>{
    
    const base64Image =  null; 
    if(image) base64Image = await toBase64(image);

    const payload = {
      userName: "Nikhil",
      email: "N@gmail.com",
      mobile: "1234567890",
      password: "password123",
      profile_image: base64Image, // Assuming image is a file object
      originalFileName: image?.name,
      temp: [{"aaa":2},{"bbb":3},{"cccc": {
        "nikhil": "kumar",
        "maui": "msks"
      }}]
    };

    const jsonPayload = JSON.stringify(payload);

    const header = {
      "Content-Type": "application/json",
    }

    const res =await registerfunc(jsonPayload,header);

    console.log(res);
    
  }

  const onImageUpload = ({files}) => {
    const [file] = files;
    setPreview(file.objectURL);
    setImage(file);
  };

  const getAllUsers = async ()=>{
    const res = await getAllUsersFunc();
    console.log(res);
  } 

  const getSingleUser = async ()=>{
    const res = await getSingleUserFunc(input);
    
    setImageFromApi(res.data.profile_image);

    console.log(res.data.profile_image);
    console.log(res);
  } 

  const upDateUser = async ()=>{

    const header = {
      "Content-Type": "application/json",
    }

    const base64Image = await toBase64(image);

    const payload = {
      userName: "KumarV",
      email: "N@gmail.com",
      mobile: "1234567890",
      profile_image: base64Image, 
      originalFileName: image.name,
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await updateUserFunc(jsonPayload, header,input);
    console.log(res);
  }

  const onDeleteUser = async () => {
    const res = await deleteUserFunc(input);
    console.log(res);
  }
  
  const loginUser = async () => {

    const payload = {
      email: "N@gmail.com",
      password: "password123",
    };
    const jsonPayload = JSON.stringify(payload);

    const header = {
      "Content-Type": "application/json",
    };

    const res = await loginUserFunc(jsonPayload, header);
    console.log(res.data);

    if(!!res.data){
      
    }
  }

  const deleteEntireUser = async()=>{
    if(input!=='comfirm') alert("Are you sure");
    const res = await deleteAllUserCollectionFunc();
    return res;
  }

  const deleteEntireUserPassword = async () => {
    if(input!=='comfirm') alert("Are you sure");
    const res = await deleteAllUserPasswordControllerFunc();
    console.log(res);
  }

  return (
    <div >
     <Button variant="primary" onClick={onPublishUser}>SAVE USER</Button>
     <img src={imageFromApi ? `${BASE_URL}/uploads/${imageFromApi}` : preview} alt="img" />
     <FileUpload name="invoice"
      accept="image/*"
      customUpload={true}
      uploadHandler={onImageUpload}
      mode="basic"
      auto={true}
      chooseLabel="Upload invoice"/>

    <Button variant="danger" onClick={getAllUsers}>GET ALL USER</Button>
    <Button variant="success" onClick={getSingleUser}>GET SINGLE USER</Button>
    <Button variant="primary" onClick={upDateUser}>UPDATE SINGLE USER</Button>
    <Button variant="danger" onClick={onDeleteUser}>DELETE USER By email</Button>
    <Button variant="success" onClick={loginUser}>Login USER</Button>
    <Button variant="danger" onClick={deleteEntireUser}>Delete entire user Collection</Button>
    <Button variant="primary" onClick={deleteEntireUserPassword}>Delete entire user Collection</Button>
    
    <label>
        Text input: <input name="myInput" style={{ border: "2px solid black" }} value={input} onChange={(e)=>{setInput(e.target.value)}}/>
      </label>


    </div>
  );
}

export default RegisterPage;
// DATABASE = mongodb+srv://nikhilkumarv500:Password%402002@cluster0.ift898h.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Cluster0
