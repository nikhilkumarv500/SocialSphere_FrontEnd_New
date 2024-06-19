import React from 'react';
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../../services/helper';

const ViewLikesModal = ({ likes, show, handleClose }) => {

  return (
    <Modal key={show?"jnscds": "kjnscsnksknjs"} show={show} onHide={()=>{
        handleClose();
        }}>
      <Modal.Header closeButton>
        <Modal.Title>People who liked your post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(likes || []).map((like) => {
         
          return (
          <div key={like._id} className="d-flex align-items-center mb-3">
            <div className="me-3">
              <img src={`${BASE_URL}/uploads/${like.profile_image}`} alt="Profile" className="rounded-circle" style={{ width: '50px', height: '50px' }} />
            </div>
            <div>
              <div>{like.userName}</div>
              <div>{like.email}</div>
            </div>
          </div> 
        )})}
        {(likes?.length||0)===0 && <span>Still no one has seen your post yet</span>}
      </Modal.Body>
    </Modal>
  );
};

export default ViewLikesModal;
