import { commonrequest } from "./ApiCall";
import {BASE_URL} from "./helper"


//user apis
export const registerfunc = async(data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/register`, data, header);
}

export const getAllUsersFunc = async()=>{
    return await commonrequest("GET", `${BASE_URL}/user/getAllUsers`,{});
}

export const getSingleUserFunc = async (emailParam)=>{
    return await commonrequest("GET",`${BASE_URL}/user/getSingleUser/${emailParam}`,{});
}

export const updateUserFunc = async(data, header, emailParam) => {
    return await commonrequest("PUT", `${BASE_URL}/user/edit/${emailParam}`, data, header);
}

export const deleteUserFunc = async (emailParam) => {
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/${emailParam}`,{});
}

export const loginUserFunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/login`, data, header);
}

export const getFollowersAccountDetailsFunc = async (payload) => {
    return await commonrequest("POST", `${BASE_URL}/user/followers`,payload);
}

export const deleteAllUserCollectionFunc = async () => {
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/allUsersCollection`,{})
}

export const deleteAllUserPasswordControllerFunc = async ()=>{
    return await commonrequest("DELETE",`${BASE_URL}/user/delete/allUserPasswordCollection`,{} )
}

// post apis

export const newPostUploadFunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/post/create`, data);
}

export const postUpdateFunc = async (data) => {
    return await commonrequest("PUT", `${BASE_URL}/post/update`, data);
}

export const likesAndCommentsUpdateFunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/post/update/likesAndComments`, data);
}

export const getAllPostsFunc = async () => {
    return await commonrequest("GET",`${BASE_URL}/post/getAllPosts`,{});
}

export const getPostsByEmailFunc = async (emailParam)=>{
    return await commonrequest("GET",`${BASE_URL}/post/getPostsByEmail/${emailParam}`,{});
}

export const deletePostsByIdFunc = async (id) => {
    return await commonrequest("DELETE",`${BASE_URL}/post/delete/${id}`,{});
}

export const deletePostsByEmailFunc = async (email) => {
    return await commonrequest("DELETE", `${BASE_URL}/post/delete/${email}`,{});
}

export const deleteAllPostFunc = async () => {
    return await commonrequest("DELETE", `${BASE_URL}/post/delete/allPost`,{})
}

export const getAllImagesStoredInUploadFolderFunc = async () => {
    return await commonrequest("POST", `${BASE_URL}/getAll/images/from/uploadFolder`,{})
}

export const deleteImageInUploadFolderByNameFunc = async (post_image) => {
    return await commonrequest("POST", `${BASE_URL}/delete/image/from/uploadFolderUsingName`,{fileName:post_image})
}