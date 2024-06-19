import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  //   data: {
  //     "_id": "6664e9a232dd071cca5ecc2e",
  //     "userName": "Nikhil",
  //     "email": "n@gmail.com",
  //     "mobile": "1234567890",
  //     "profile_image": "generalPerson.jpeg",
  //     "user_description": "Hi, am a new user ",
  //     "connections": [],
  //     "requests": [],
  //     "money": 0,
  //     "coupons": [],
  //     "dateCreated": "2024-06-08T23:30:42.000Z",
  //     "__v": 0,
  //     "userPosts": [
  //         {
  //             "_id": "6661fd88d18dd0d4f0d7e3fc",
  //             "userName": "Nikhil",
  //             "email": "n@gmail.com",
  //             "profile_image": "generalPerson.jpeg",
  //             "post_image": "spider.jpg_1717925630724.jpeg",
  //             "post_name": "SpiderMan",
  //             "description": "SpiderMan",
  //             "likes": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "6665a73a08884b0e38fd0f74"
  //                 }
  //             ],
  //             "comments": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "message": "India is best",
  //                     "_id": "6665791bbcb620ad22f7ed41"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "message": "aswesome aswesome",
  //                     "_id": "6665791bbcb620ad22f7ed42"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "message": "too japanChina",
  //                     "_id": "6665791bbcb620ad22f7ed43"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "message": "really ggoogogogod",
  //                     "_id": "6665791bbcb620ad22f7ed44"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "message": "NHCE ",
  //                     "_id": "6665abec08884b0e38fd0fdb"
  //                 }
  //             ],
  //             "__v": 0
  //         },
  //         {
  //             "_id": "63220a4bcb888e6b1236a9ca",
  //             "userName": "Nikhil",
  //             "email": "n@gmail.com",
  //             "profile_image": "generalPerson.jpeg",
  //             "post_image": "edit.png_1717925766200.png",
  //             "post_name": "Ranger_desciption",
  //             "description": "Ranger_desciption",
  //             "likes": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed4f"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed50"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed51"
  //                 }
  //             ],
  //             "comments": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed52"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed53"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed54"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657921bcb620ad22f7ed55"
  //                 }
  //             ],
  //             "__v": 0
  //         },
  //         {
  //             "_id": "666561adbaf2477f4cd2485c",
  //             "userName": "Nikhil",
  //             "email": "n@gmail.com",
  //             "profile_image": "generalPerson.jpeg",
  //             "post_image": "1.png_1717925609469.png",
  //             "post_name": "fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj",
  //             "description": "fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj fjaaaknjaj",
  //             "likes": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed60"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed61"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed62"
  //                 }
  //             ],
  //             "comments": [
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed63"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed64"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed65"
  //                 },
  //                 {
  //                     "userName": "Nikhil",
  //                     "email": "n@gmail.com",
  //                     "profile_image": "generalPerson.jpeg",
  //                     "_id": "66657925bcb620ad22f7ed66"
  //                 }
  //             ],
  //             "__v": 0
  //         }
  //     ]
  // },
  data: {
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
  },
  toast: { show: false, msg: "Error", type: "danger" },
};

export const GlobalStoreSlice = createSlice({
  name: "GlobalState",
  initialState: initialState,
  reducers: {
    updateInnerGlodalStore: (state, action) => {
      state.data = action.payload;
    },
    updateToastState: (state, action) => {
      state.toast.msg = action.payload.msg;
      state.toast.type = action.payload.type || "danger";
      state.toast.show = true;
    },
    silenceToastMsg: (state, action) => {
      state.toast.show = false;
    },
  },
});

export const { updateInnerGlodalStore, updateToastState, silenceToastMsg } =
  GlobalStoreSlice.actions;

export default GlobalStoreSlice.reducer;
