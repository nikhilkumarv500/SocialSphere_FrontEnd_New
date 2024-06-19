import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteAllPostFunc, deletePostsByEmailFunc, deletePostsByIdFunc, getAllPostsFunc, getPostsByEmailFunc, likesAndCommentsUpdateFunc, newPostUploadFunc, postUpdateFunc } from "../services/Apis";
import { FileUpload } from "primereact/fileupload";
import { BASE_URL } from "../services/helper";

const PostPage = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [imageFromApi, setImageFromApi] = useState(null);
  const [data,setData] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

    const onImageUpload = ({ files }) => {
      const [file] = files;
      setPreview(file.objectURL);
      setImage(file);
    };

  const onPublishPost = async () => {
    const base64Image = await toBase64(image);

    const payload = {
      userName: "Nikhil",
      email: "N@gmail.com",
      profile_image: "1.png",
      post_image: base64Image,
      originalFileName: image.name,
      post_name: "insanePost_name",
      description: "insanePost_desciption",
      likes: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
        },
      ],
      comments: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
          message: "powerIsPower",
        },
      ],
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await newPostUploadFunc(jsonPayload);

    console.log(res);
  };

  const onUpdatePost = async ()=> {

    const base64Image = await toBase64(image);

    const payload = {
      id: "6661fd88d18dd0d4f0d7e3fc",
      userName: "Nikhil",
      email: "N@gmail.com",
      profile_image: "1.png",
      post_image: base64Image,
      originalFileName: image.name,
      post_name: "powerRanger_name",
      description: "powerRanger_desciption",
      likes: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
        },
      ],
      comments: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
          message: "powerIsPower",
        },
      ],
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await postUpdateFunc(jsonPayload);

    console.log(res);

  }


  const onUpdateLikes = async () =>{
    
    const payload = {
      id: "6661fd88d18dd0d4f0d7e3fc",
      likes: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
        },
        {
          userName: "dore",
          email: "dore@gmail.com",
          profile_image: "dorea.png",
        },
      ],
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await likesAndCommentsUpdateFunc(jsonPayload);

    console.log(res);
     
  };

  const onUpdateComments = async () =>{
    
    const payload = {
      id: "6661fd88d18dd0d4f0d7e3fc",
      comments: [
        {
          userName: "powerRange",
          email: "power@gmail.com",
          profile_image: "1.png",
          message: "powerIsPower",
        },
        {
          userName: "doraDora",
          email: "doraDora@gmail.com",
          profile_image: "doraDora.png",
          message: "doraDora is doraDora",
        },
      ],
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await likesAndCommentsUpdateFunc(jsonPayload);

    console.log(res);
     
  };

  const getAllPosts = async ()=> {
    const res = await getAllPostsFunc();

    console.log(res);
  }

  const getPostsByEmail = async () => {
    const res = await getPostsByEmailFunc("p@gmail.com");
    console.log(res);
  }

  const deletePostById = async () => {
    const res = await deletePostsByIdFunc(data);
    console.log(res);
  }

  const deletePostByEmail = async () => {
    const res = await deletePostsByEmailFunc(data);
    console.log(res);
  }

  const deleteAllPosts = async ()=>{
    if(data!=="confirm") alert("Are you sure");
    const res = await deleteAllPostFunc();
    console.log(res);
  }
 

  return (
    <div>
      <img
        src={imageFromApi ? `${BASE_URL}/uploads/${imageFromApi}` : preview}
        alt="img"
      />
      <FileUpload
        name="invoice"
        accept="image/*"
        customUpload={true}
        uploadHandler={onImageUpload}
        mode="basic"
        auto={true}
        chooseLabel="Upload invoice"
      />
      <Button variant="success" onClick={onPublishPost}>New Post</Button>
      <Button variant="primary" onClick={onUpdatePost}>Update Post</Button>
      <Button variant="success" onClick={onUpdateLikes}>Update likes</Button>
      <Button variant="primary" onClick={onUpdateComments}>Update Comments</Button>
      <Button variant="danger" onClick={getAllPosts}>get All Post</Button>
      <Button variant="success" onClick={getPostsByEmail}>get Post by email</Button>
      <Button variant="primary" onClick={deletePostById}>delete Post by id</Button>
      <Button variant="primary" onClick={deletePostByEmail}>delete Post by email</Button>
      <Button variant="danger" onClick={deleteAllPosts}>delete all post</Button>
      <Button variant="danger" onClick={deleteAllPosts}>delete all post</Button>
      <input style={{ border: "2px solid black" }} value={data} onChange={(e) => { setData(e.target.value) }}></input>

    </div>
  );
};

export default PostPage;
// DATABASE = mongodb+srv://nikhilkumarv500:Password%402002@cluster0.ift898h.mongodb.net/SocialMedia?retryWrites=true&w=majority&appName=Cluster0
