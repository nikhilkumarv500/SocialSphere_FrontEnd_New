import React from 'react';
import { SyncLoader } from "react-spinners";

const LoadingScreen = ({ loading }) => {
  return (
    loading &&
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <SyncLoader color="#36d7b7" />
    </div>
  );
};

export default LoadingScreen;
