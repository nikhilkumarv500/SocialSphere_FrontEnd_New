import React, { useEffect, useState } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import Select from 'react-select';
import NewPostModal from '../PostModals/NewPostModal';
import { useSelector } from 'react-redux';
import { deepClone, useUpdateStore } from '../../ReduxStores/UpdateStore';
import { getAllUsersFunc } from '../../services/Apis';

const PostPageNavBar = ({ userName }) => {
  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');



  const [localUserData, setLocalUserData] = useState([]);

  const init =async()=>{
    const res = await getAllUsersFunc();
    setLocalUserData(res.data);
  };

  useEffect(()=>{
    init();
  },[])
  
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setGlobalStore({...userData, selectedFilterToShowPost: user?.email})
  };


  return (
    <Navbar bg="light" variant="light" style={{ borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: "1rem" }}>
      <Navbar.Brand style={{ width: '500px' }}>
        <div style={{ flex: 1 , marginLeft:"1rem"}}>
          <Select
          isClearable
            options={localUserData.map(user => ({ value: user.email, label: user.userName }))}
            value={selectedUser ? { value: selectedUser.email, label: selectedUser.userName } : 0}
            onChange={(selectedOption) => {
              const user = localUserData.find(u => u.email === selectedOption?.value);
              handleSelectUser(user);
            }}
            styles={{
              control: (provided) => ({
                ...provided,
                borderRadius: '5px',
                border: '1px solid #ccc'
              }),
            }}
            placeholder="Search Users"
            isSearchable
            menuPortalTarget={document.body}
            menuPlacement="auto"
          />
        </div>
      </Navbar.Brand>
      <div style={{ marginLeft: 'auto', marginRight: '1rem' }}>
        <Button variant="dark" onClick={() => { setShowModal(true) }}>Add Post</Button>
      </div>
      <NewPostModal show={showModal} handleClose={() => { setShowModal(false) }} />
    </Navbar>
  );
};

export default PostPageNavBar;
