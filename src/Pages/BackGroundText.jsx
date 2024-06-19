import React from 'react';
import WebGLCanvas from '../Components/WebGLCanvas/WebGLCanvas';
import Blob from '../Components/Blob/Blob';


export default function BackGroundTest({refresh}) {
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <img src="/registerPageBackGround.jpg" alt="background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
        <WebGLCanvas />
      </div>

      <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", zIndex: -1 , transform: "translateX(100%)" }} key={refresh}>
        <Blob />
      </div>
    </>
  );
}
