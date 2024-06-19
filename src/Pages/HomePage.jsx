import React, { useEffect } from 'react';
import NavBar from '../Components/NavBar/NavBar';
import UserInfoCard from '../Components/UserInfoCard/UserinfoCard';
import LeftConnectionCard from '../Components/LeftConnectionsCard/LeftConnectionCard';
import RightConnectionCard from '../Components/RightConnectionCard/RightConnectionCard';
import Robot from "../Components/Robot";
import { useSelector } from 'react-redux';
import { deepClone, useUpdateStore } from '../ReduxStores/UpdateStore';
import PostCardPage from '../Components/PostCardPage/PostCardPage';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const userData = deepClone(useSelector(state => state.GlobalState.data));
    const navigate = useNavigate();
    const { setGlobalStore, setToastState } = useUpdateStore();

    useEffect(()=>{
        if(userData.email==="") {
            navigate("/");
            setToastState({ msg: "Please Login with Proper Credentials", type: "danger" });
        }
    },[])

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            <NavBar />
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
                <img src="/registerPageBackGround.jpg" alt="background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <div style={{ display: "flex", width: "100%", paddingLeft: "4rem", paddingRight: "4rem", paddingTop: "2rem", paddingBottom: "2rem" }}>
                <div style={{ padding: "20px", textAlign: "center", width: "25%", minWidth: "300px" }}>
                    <UserInfoCard />
                    <LeftConnectionCard />
                </div>
                <div style={{ padding: "20px", textAlign: "center", width: "50%" }}>
                   <PostCardPage/>
                </div>
                <div style={{ padding: "20px", textAlign: "center", width: "25%" }}>
                    <div style={{ height: "25rem", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
                        <Robot />
                    </div>
                    <RightConnectionCard/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
