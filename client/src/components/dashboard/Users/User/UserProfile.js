import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import User from "../User/User";

import { useSelector } from "react-redux";

import Navbar from "../../../layout/Navbar";
import Footer from "../../../layout/Footer";
import Modal from "../../../Modal/Modal";
import Loader from "../../../Loader/Loader";

const UserProfile = (props) => {
  const history = useHistory();
  const { username } = useParams();
  const loggedUser = useSelector((state) => state.loggedUser);

  const [modal, setModal] = useState(false);
  const [follow, setFollow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openPost, setOpenPost] = useState(null);
  const [commentsModal, setCommentsModal] = useState(null);
  const [changeModal, setChangeModal] = useState(null);
  const [likesArr, setLikesArr] = useState(null);
  let count = 0;

  useEffect(() => {
    fetch(`/api/users/user/${username}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.user) {
          setUserData(result.user);
        } else {
          history.push("/");
        }
        if (changeModal === true) {
          setUserData(result.user);
        }
      })
      .catch((er) => console.log(er));
  }, [follow, changeModal]);

  const handleFollow = () => {
    fetch(`/api/users/user/${username}/follow`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then((result) => result.json())
      .then((result) => {
        if (!result.error) {
          setFollow((prev) => !prev);
        }
      })
      .catch((er) => console.log(er));
  };

  const changeCurrentPage = () => {
    const arr =
      activeIndex > 0 ? userData.posts.slice(0, activeIndex) : userData.posts;
    arr.map((post) => {
      setOpenPost(post);
      setCommentsModal(post.comments);
      setLikesArr(post.likes);
    });
  };
  const prevIndexEl = () => {
    setActiveIndex(activeIndex ? activeIndex - 1 : userData.posts.length - 1);
    changeCurrentPage();
  };
  const nextImgEl = () => {
    setActiveIndex(
      activeIndex <= userData.posts.length - 1
        ? activeIndex + 1
        : userData.posts.length - 1
    );
    changeCurrentPage();
  };
  const modalOpen = (src) => {
    setModal(true);

    if (userData) {
      const newPost = userData.posts.filter(
        (post, i, posts) => posts[i].src === src
      );
      const [{ ...currentPost }] = newPost;
      setOpenPost(currentPost);
      setCommentsModal(currentPost.comments);
      setLikesArr(currentPost.likes);
    }
  };
  const modalClose = () => {
    setModal(false);
  };

  if (userData) {
    return (
      <>
        <Navbar username={loggedUser.username} />
        {modal && (
          <Modal
            onClick={modalClose}
            prevIndexEl={prevIndexEl}
            nextImgEl={nextImgEl}
            openPost={openPost}
            comments={commentsModal}
            setCommentsModal={setCommentsModal}
            setChangeModal={setChangeModal}
            likesArr={likesArr}
            setLikesArr={setLikesArr}
            user={
              <User
                photoUser={userData.userimg}
                alt={"man"}
                userName={userData.username}
              />
            }
          />
        )}
        <div className='container profile'>
          <h3>{username}</h3>
          <div className='user-data'>
            <div>
              <img src={userData.userimg} className='min' />
            </div>
            <h5>{userData.name}</h5>
            <div className='user-activity'>
              <div>
                <strong>posts:</strong> {userData.posts.length}
              </div>
              <div>
                <strong>followers:</strong> {userData.followers.length}
              </div>
              <div>
                <strong>following:</strong> {userData.following.length}
              </div>
            </div>
            {userData._id !== loggedUser._id ? (
              userData.followers.find((id) => id === loggedUser._id) ? (
                <div
                  onClick={handleFollow}
                  className='btn grey'
                  style={{ width: "50%", borderRadius: "0.3rem" }}
                >
                  <strong className='white-text'>Unfollow</strong>
                </div>
              ) : (
                <div
                  onClick={handleFollow}
                  className='btn pink'
                  style={{ width: "50%", borderRadius: "0.3rem" }}
                >
                  <strong className='white-text'>Follow</strong>
                </div>
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className='container posts'>
          {userData.posts.map((post) => (
            <img
              key={++count}
              src={post.src}
              alt='posts'
              onClick={() => modalOpen(post.src)}
              className='profile-posts'
            />
          ))}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar username={loggedUser.username} />
        <Loader />
        <Footer />
      </>
    );
  }
};

export default UserProfile;
