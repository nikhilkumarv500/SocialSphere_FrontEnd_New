import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Menu, MenuItem } from '@mui/material';
import { BASE_URL } from '../../services/helper';
import EditPostModal from '../PostModals/EditPostModal';
import ViewLikesModal from '../ViewLikesModal/ViewLikesModal';
import { useSelector } from 'react-redux';
import { deepClone, useUpdateStore } from '../../ReduxStores/UpdateStore';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { deletePostsByIdFunc, likesAndCommentsUpdateFunc } from '../../services/Apis';
import ViewCommentsModal from '../ViewCommentsModal/ViewCommentsModal';

const Card = styled('div')({
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '10px',
  marginBottom: '1rem',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
});

const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1.5rem',
});

const UserInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const UserText = styled('div')({
  marginLeft: '1rem',
  display: 'flex',
  flexDirection: 'column',
});

const Name = styled('div')({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  alignSelf: 'flex-start',
});

const Email = styled('div')({
  fontSize: '0.8rem',
  color: '#666',
});

const PostDescription = styled('div')({
  marginTop: '1rem',
  marginBottom: '2rem',
  textAlign: 'left', 
});

const PostImageContainer = styled('div')({
  width: '100%',
  height: '20rem', 
  marginBottom: '1rem',
  overflow: 'hidden',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PostImage = styled('img')({
  // width: '100%',
  height: '100%',
  objectFit: 'contain', 
  border: '1px solid black', 
  borderRadius: '8px', 
});

const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ActionButton = styled(IconButton)({
  marginRight: '1rem',
});

const DarkDivider = styled(Divider)({
  backgroundColor: 'rgba(0, 0, 0, 0.4)', 
});

const PostCard = ({ userName, email, profile_image, post_image,post_image_url ,post_name, description, likes, comments, _id ,threeDotsEditable}) => {
  

  const [loading, setLoading] = useState(false);

  const userData = deepClone(useSelector(state=>state.GlobalState.data));
  const { setGlobalStore, setToastState } = useUpdateStore();


  const [liked, setLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showViewLikesModal, setShowViewLikesModal] = useState(false);
  const [showViewCommentsModal, setShowViewCommentsModal] = useState(false);


  useEffect(()=>{
   if((likes || []).length>0)
   {
     (likes || []).map((item)=>{
      if(item.email===userData.email)
      {
        setLiked(true);
      }
     })
   }
  },[likes]);

  const handleLike = async () => {
    setLoading(true);

    const copyLikesList = deepClone(likes);


      let ind=-1;

      let payload = {
        id: _id,
        likes: copyLikesList,
      };

      for(let i=0 ; i<copyLikesList.length; i++ )
      { 
        if(copyLikesList[i].email===userData.email){
          ind=i;   
          break;
        }
      }


      if(ind!==-1) {copyLikesList.splice(ind,1); setLiked(false);}
      else{
         copyLikesList.push({
        userName: userData.userName,
        email: userData.email,
        profile_image: userData.profile_image
      })
      setLiked(true);  
    }
      payload.likes=copyLikesList;
  
      const jsonPayload = JSON.stringify(payload);
  
      const res = await likesAndCommentsUpdateFunc(jsonPayload);
      
      if(!res.status || res.status!==200){
        setToastState({msg: "Could not proces like/Unlike post", type: "danger"});
        setLoading(false);
        return;
      }
      
      let prev = deepClone(userData);

      for(let j=0;j<prev.userPosts.length;j++) {
        if(prev.userPosts[j]._id===_id) {
          prev.userPosts[j].likes=copyLikesList;
        }
      }


      setGlobalStore({...prev});
      

      // setToastState({msg: "Could not proces like/Unlike post", type: "danger"});
      
      setLoading(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewLikes = () => {
    setShowViewLikesModal(true);


    handleClose();
  };

  const handleEditPost = () => {
    setShowModal(true);
    handleClose();
  };

  const handleDeletePost = async() => {
    setLoading(true);
    const res = await deletePostsByIdFunc(_id);

    if(!res.status || res.status!==200)
    {
      { setLoading(false); setToastState({msg: "Could not delete your post", type: "danger"}); return; }
    }

    const prev = deepClone(userData);

    prev.userPosts = prev.userPosts.filter((item)=>{
      return item._id!==_id;
    })

    setToastState({msg: "Post deleted successfully", type: "success"});

    setGlobalStore({...prev});
    setLoading(false);
  }

  return (
    <>
    <LoadingScreen loading={loading} />
    <Card>
      <Header>
        <UserInfo>
          <Avatar alt={userName} src={`${BASE_URL}/uploads/${profile_image}`} />
          <UserText>
            <Email>{email}</Email>
            <Name>{userName}</Name>
          </UserText>
        </UserInfo>
       
        
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleViewLikes}>View Likes</MenuItem>
          {threeDotsEditable && <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>}
          {threeDotsEditable && <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>}
        </Menu>
        
      </Header>
      <DarkDivider />
      <PostDescription>
        {description}
      </PostDescription>
      {post_image && (
        <PostImageContainer>
          <PostImage src={post_image==='generalPost.jpeg' ? `${BASE_URL}/uploads/${post_image}` : `${post_image_url}`}  alt="Unavailabe to fetch your post from server" />
        </PostImageContainer>
      )}
      <DarkDivider />
      <Actions>
        <ActionButton onClick={handleLike}>
          {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
        </ActionButton>
        <ActionButton onClick={()=>{setShowViewCommentsModal(true)}}>
          <ChatBubbleOutlineIcon />
        </ActionButton>
      </Actions>
    </Card>
    <ViewLikesModal key={showViewLikesModal ? "alksjdn" : "7rf8"} show={showViewLikesModal}  handleClose={()=>{setShowViewLikesModal(false);}} likes={likes}/>
    <EditPostModal key={showModal ? "1nsdnd" : "jsakjads3"} show={showModal} handleClose={()=>{setShowModal(false)}} description={description}  post_image={post_image} post_image_url={post_image_url} id={_id}/>
    <ViewCommentsModal key={showViewCommentsModal ? "cokwjrkjnrmments1" : "comkjwaknfments2"} show={showViewCommentsModal} handleClose={() => setShowViewCommentsModal(false)} comments={comments} postId={_id}/>
    </>
  );
};

export default PostCard;
