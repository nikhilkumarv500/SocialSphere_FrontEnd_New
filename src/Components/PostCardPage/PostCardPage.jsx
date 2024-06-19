import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard'
import PostPageNavBar from '../PostPageNavBar/PostPageNavBar'
import { useSelector } from 'react-redux';
import { deepClone } from '../../ReduxStores/UpdateStore';

const PostCardPage = () => {

  const userData = (useSelector((state) => state.GlobalState.data));

  const [currentPostArray, setCurrentPostArray] = useState([]);

  useEffect(()=>{
    setCurrentPostArray(deepClone(userData.userPosts.filter(item => {
      if (!userData.selectedFilterToShowPost) return true;
      return item.email === userData.selectedFilterToShowPost;
    })).sort((a, b) => {
      const dateA = parseInt(a.dateCreated, 10); // Assuming a.dateCreated is a string representation of milliseconds
  const dateB = parseInt(b.dateCreated, 10);

  // Sort by dateCreated in descending order
  return dateB - dateA;
    }));
  },[userData.userPosts])

  return (
    <div>
        <PostPageNavBar/>

        {currentPostArray.map((item)=>{
          return (
            <PostCard  {...item} threeDotsEditable={item.email === userData.email}/>
          )
        })}
        { currentPostArray.length === 0 &&
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: 'black', textAlign: 'center' }}>No posts yet</h3>
            </div>
          </div>
        }
    </div>
  )
}

export default PostCardPage
