import React from "react";
import Button from "../Button/Button";
import { ReactSVG } from "react-svg";
import Comments from "../Comments/Comments";
import { useSelector } from "react-redux";
const Modal = (props) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const {
    onClick,
    prevIndexEl,
    comments,
    setChangeModal,
    setCommentsModal,
    likesArr,
    setLikesArr,
    user,
    nextImgEl
  } = props;
  const { descr, src, _id } = props.openPost;

  const bgPhoto = { background: `url(${src}) center center / cover` };

  const like = () => {
    fetch("/api/post/like", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({ postId: _id })
    })
      .then((data) => {
        data.json();

        if (!likesArr.includes(loggedUser._id)) {
          setLikesArr([...likesArr, loggedUser._id]);
        } else {
          setLikesArr([...likesArr.filter((e) => e !== loggedUser._id)]);
        }
        setChangeModal(true);
      })
      .then(() => setChangeModal(false))
      .catch((er) => console.log(er));
  };

  return (
    <div className='modalP' onClick={onClick}>
      <Button
        className='CloseButton'
        backgroundColor={"none"}
        text={"X"}
        onClick={onClick}
      />
      <div
        className='modalP__wrapper'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          className='buttonModal buttonModal--SliderPrev'
          backgroundColor={"transparent"}
          text={<ReactSVG src='/img/Modal/sl-arrow_l.svg' />}
          onClick={prevIndexEl}
        />
        <div className='modalP__content containerI'>
          <div className='modalImg' style={bgPhoto} onDoubleClick={like}>
            {" "}
          </div>
          <div className='modalText'>
            <div className='modalText__user'>
              {user}
              <div className='modalText__descr'>{descr}</div>
            </div>

            <div className='modalText__text'>
              <div
                className='modalText__wrapper'
                style={bgPhoto}
                onDoubleClick={like}
              >
                {" "}
              </div>
              <div className='modalText__block'>
                <Comments
                  setChangeModal={setChangeModal}
                  comments={comments}
                  setComments={setCommentsModal}
                  postID={_id}
                />
              </div>
            </div>
            <div className='icons'>
              <div className='svgContainer'>
                {!likesArr.includes(loggedUser._id) ? (
                  <ReactSVG
                    onClick={like}
                    src='/img/Posts/iconmonstr-heart-thin.svg'
                    style={{ padding: "8px", zIndex: 1 }}
                  />
                ) : (
                  <ReactSVG
                    onClick={like}
                    src='/img/Posts/iconmonstr-favorite-3.svg'
                    style={{ padding: "8px", zIndex: 1 }}
                  />
                )}
                <strong>Likes</strong>: {likesArr.length}
              </div>
              <ReactSVG
                src='/img/Posts/bookmark-white.svg'
                style={{ padding: "8px" }}
              />
            </div>
          </div>
        </div>{" "}
        <Button
          className='buttonModal buttonModal--SliderNext'
          backgroundColor={"transparent"}
          text={<ReactSVG src='/img/Modal/sl-arrow_r.svg' />}
          onClick={nextImgEl}
        />
      </div>
    </div>
  );
};
export default Modal;
