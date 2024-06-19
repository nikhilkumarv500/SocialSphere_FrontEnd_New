import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Form } from "react-bootstrap";
import { BASE_URL } from "../../services/helper";
import "bootstrap/dist/css/bootstrap.min.css";
import { likesAndCommentsUpdateFunc } from "../../services/Apis";
import { deepClone, useUpdateStore } from "../../ReduxStores/UpdateStore";
import { useSelector } from "react-redux";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentContainer = {
  display: "flex",
  alignItems: "center",
  marginBottom: "1rem",
  position: "relative",
  width: "100%", 
};

const CommentText = {
  marginLeft: "1rem",
  display: "flex",
  flexDirection: "column",
};

const CommentName = {
  fontWeight: "bold",
  fontSize: "1rem",
};

const CommentEmail = {
  fontSize: "0.8rem",
  color: "#666",
};

const CommentMessageContainer = {
  position: "relative",
  marginTop: "0.5rem",
};

const CommentMessageBubble = {
  backgroundColor: "#f0f0f0",
  padding: "0.5rem",
  borderRadius: "10px",
  position: "relative",
  width: "75%" /* Take up 75% of the width */,
};

const CommentMessageTriangle = {
  position: "absolute",
  width: 0,
  height: 0,
  borderTop: "10px solid transparent",
  borderBottom: "10px solid transparent",
  borderRight: "10px solid #f0f0f0",
  top: "50%",
  transform: "translateY(-50%)",
  left: "-10px",
};

const CommentMessage = {
  fontSize: "0.9rem",
};

const EditButton = {
  cursor: "pointer",
  position: "absolute", 
  right: "40px",
  top: "50%", 
  transform: "translateY(-50%)", 
  fontSize: "1.2rem", 
};

const DeleteButton = {
  cursor: "pointer",
  position: "absolute", 
  right: "0", 
  top: "50%", 
  transform: "translateY(-50%)", 
  fontSize: "1.2rem", 
};

const ViewCommentsModal = ({ comments, show, handleClose, postId }) => {
  const [parentComments, setParentComments] = useState([]);

  useEffect(() => {
    if ((comments || []).length > 0) {
      setParentComments(comments);
    }
  }, [comments]);

  const userData = deepClone(useSelector((state) => state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();

  const [editedCommentIndex, setEditedCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    setLoading(true);

    const updateComments = deepClone(comments);

    updateComments.push({
      userName: userData.userName,
      email: userData.email,
      profile_image: userData.profile_image,
      message: editedComment,
    });

    const payload = {
      id: postId,
      comments: updateComments,
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await likesAndCommentsUpdateFunc(jsonPayload);

    if (!res.status || res.status !== 200) {
      setLoading(false);
      setToastState({ msg: "Could not add your comment", type: "danger" });
      return;
    }

    const prev = deepClone(userData);

    for (let i = 0; i < (prev.userPosts || []).length; i++) {

      if (prev.userPosts[i]._id === postId) {
        prev.userPosts[i].comments = updateComments;
      }
    }

    setGlobalStore({ ...prev });
    setEditedComment("");
    setLoading(false);
  };

  const handleEdit = (index) => {
    setEditedCommentIndex(index);
    setEditedComment(parentComments[index].message);
  };

  const handleCancelEdit = () => {
    setEditedCommentIndex(null);
    setEditedComment("");
  };

  const handleSaveEdit = async () => {
    setLoading(true);

    const updatedComments = deepClone(parentComments);
    updatedComments[editedCommentIndex].message = editedComment;
    setParentComments(updatedComments);

    const payload = {
      id: postId,
      comments: updatedComments,
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await likesAndCommentsUpdateFunc(jsonPayload);

    if (!res.status || res.status !== 200) {
      setLoading(false);
      setToastState({ msg: "Could not add your comment", type: "danger" });
      return;
    }

    const prev = deepClone(userData);

    for (let i = 0; i < (prev.userPosts || []).length; i++) {

      if (prev.userPosts[i]._id === postId) {
        prev.userPosts[i].comments = updatedComments;
      }
    }

    setGlobalStore({ ...prev });

    setEditedCommentIndex(null);
    setEditedComment("");

    setLoading(false);
  };

  const handleDelete = async (index) => {
    setLoading(true);

    const updatedComments = deepClone(parentComments);
    updatedComments.splice(index, 1);
    setParentComments(updatedComments);

    const payload = {
      id: postId,
      comments: updatedComments,
    };

    const jsonPayload = JSON.stringify(payload);

    const res = await likesAndCommentsUpdateFunc(jsonPayload);

    if (!res.status || res.status !== 200) {
      setLoading(false);
      setToastState({ msg: "Could not delete the comment", type: "danger" });
      return;
    }

    const prev = deepClone(userData);

    for (let i = 0; i < (prev.userPosts || []).length; i++) {

      if (prev.userPosts[i]._id === postId) {
        prev.userPosts[i].comments = updatedComments;
      }
    }

    setGlobalStore({ ...prev });
    setLoading(false);
  };

  return (
    <>
      <LoadingScreen loading={loading} />
      <Modal
        show={show}
        onHide={() => {
          handleClose();
          setEditedComment("");
          setEditedCommentIndex(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Comment Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parentComments.map((comment, index) => (
            <div key={comment._id}>
              <div style={CommentContainer}>
                <Image
                  roundedCircle
                  src={`${BASE_URL}/uploads/${comment.profile_image}`}
                  alt={comment.userName}
                  width={40}
                  height={40}
                />
                <div style={CommentText}>
                  <div style={CommentName}>{comment.userName}</div>
                  <div style={CommentEmail}>{comment.email}</div>
                </div>
                {comment.email===userData.email && editedCommentIndex !== index && (
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={EditButton}
                    onClick={() => handleEdit(index)}
                  />
                )}
                {comment.email===userData.email &&  editedCommentIndex !== index && (
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={DeleteButton}
                    onClick={() => handleDelete(index)}
                  />
                )}
              </div>
              {editedCommentIndex === index ? (
                <Form.Group controlId="editComment">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <div style={{ marginTop: "0.5rem", textAlign: "right" }}>
                    <Button
                      variant="outline-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>{" "}
                    <Button variant="primary" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  </div>
                </Form.Group>
              ) : (
                <div style={CommentMessageContainer}>
                  <div style={CommentMessageBubble}>
                    <div style={CommentMessageTriangle}></div>
                    <div style={CommentMessage}>{comment.message}</div>
                  </div>
                </div>
              )}
              <hr />
            </div>
          ))}
          <Form.Group controlId="newComment">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add your comment..."
              value={editedCommentIndex === null ? editedComment : ""}
              onChange={(e) => setEditedComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              if (editedComment !== "") {
                setEditedComment("");
                setEditedCommentIndex(null);
              } else {
                handleClose();
                setEditedComment("");
                setEditedCommentIndex(null);
              }
            }}
          >
            {editedComment !== "" ? "Cancel" : "Close"}
          </Button>
          {editedComment !== "" && (
            <Button variant="primary" onClick={handleAddComment}>
              Add Comment
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewCommentsModal;
