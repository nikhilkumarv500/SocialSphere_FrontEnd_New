import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { deepClone, useUpdateStore } from '../../ReduxStores/UpdateStore';
import { BASE_URL } from '../../services/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { updateUserFunc } from '../../services/Apis';

const LeftConnectionCard = () => {
    const userData = deepClone(useSelector(state => state.GlobalState.data));
    const { setGlobalStore, setToastState } = useUpdateStore();
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(''); 

    const connections = (userData.connections || []).filter(connection =>
        connection.userName.toLowerCase().includes(searchText.toLowerCase()) ||
        connection.email.toLowerCase().includes(searchText.toLowerCase())
    );

    const styles = {
        card: {
            padding: '20px',
            border: '2px solid white',
            borderRadius: '10px',
            backgroundColor: 'white',
            marginBottom: '0.5rem', 
            marginTop: '1rem', 
            overflow: 'auto', 
        },
        header: {
            fontWeight: 'bold',
            fontSize: '1.2rem',
            marginBottom: '10px',
            textAlign: 'left'
        },
        inputWrapper: {
            marginBottom: '10px', 
            position: 'relative', 
        },
        searchInput: {
            width: '100%',
            height: '40px',
            padding: '0 15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxSizing: 'border-box',
            marginBottom: "1rem"
        },
        greyLine: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '1px',
            backgroundColor: '#ccc',
        },
        connections: {
            display: 'flex',
            flexDirection: 'column'
        },
        connectionRow: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            marginBottom: '10px', 
        },
        connectionDivider: {
            borderBottom: '1px solid #ccc', 
            marginBottom: '10px', 
            width: '100%', 
        },
        userImage: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundSize: 'cover',
            marginRight: '10px',
            flexShrink: 0, 
        },
        userInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', 
            flex: 1, 
        },
        username: {
            fontWeight: 'bold',
            marginBottom: '5px', 
        },
        email: {
            marginBottom: '5px', 
            fontSize: '0.8rem',
            color: '#666',
        },
        plusButtonWrapper: {
            position: 'relative',
        },
        plusButton: {
            borderRadius: '50%',
        },
        buttonHighlight: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            zIndex: 0,
        },
        button: {
            padding: '10px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '1rem',
        },
    };

    const onSelectProfile = async (connection) => {
        setLoading(true);

        let updateConnectionList = userData.connections.filter((item)=>{
            return item.email!==connection.email;
        })

        const payload = {
            email: userData.email,
            connections: updateConnectionList,
          };
          
          const jsonPayload = JSON.stringify(payload);

          const header = {
            "Content-Type": "application/json",
          };
      
          const res = await updateUserFunc(jsonPayload, header, userData.email);

          if(!res.status || res.status!==200){
            setToastState({msg: "Could not remove connection", type: "danger"});
            return;
          }


          const prev = deepClone(userData);

          prev.connections=payload.connections;
          
          prev.otherProfiles=[{...connection},...prev.otherProfiles];

          setGlobalStore({...prev});
          setLoading(false);
          setToastState({msg: "Connection removed successfully", type: "success"});

    }

    return (
        <>
        <LoadingScreen loading={loading}/>
            <div style={styles.card}>
            <div style={styles.header}>Friends List</div>
                <div style={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={styles.searchInput}
                    />
                    <div style={styles.connectionDivider}></div>
                </div>
                
                {(connections?.length|| 0) > 0 && <div style={styles.connections}>
                    {connections.map((connection, index) => (
                        <React.Fragment key={index}>
                            <div style={styles.connectionRow}>
                                <div style={{ ...styles.userImage, backgroundImage: connection.profile_image ? `url('${BASE_URL}/uploads/${connection.profile_image}')` : 'grey' }}></div>
                                <div style={styles.userInfo}>
                                    <div style={styles.username}>{connection.userName}</div>
                                    <div style={styles.email}>{connection.email}</div>
                                </div>
                                    <Button
                                        variant='dark'
                                        style={styles.plusButton}
                                        onClick={()=>{onSelectProfile(connection);}}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                            </div>
                            <div style={styles.connectionDivider}></div>
                        </React.Fragment>
                    ))}
                </div>}
                    
                {(connections?.length|| 0)===0 && <div>You haven't made any friends yet</div>}
                
            </div>
        </>
    );
};

export default LeftConnectionCard;
