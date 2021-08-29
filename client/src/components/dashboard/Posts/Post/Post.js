import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import User from "../../Users/User/User";
import ShowMore from "../../showMore/showMore";
import Comments from "../../../Comments/Comments";

import { useSelector } from "react-redux";

const Post = (props) => {
  const loggedUser = useSelector((state) => state.loggedUser);
  const { userName, photoUser, description, src, alt, id, comments, likes } =
    props;
  const[commentsPost,setCommentsPost]=useState(comments)
  const [likesArr, setLikesArr] = useState(likes);
  const arr = likesArr;

  const like = () => {
    fetch("/api/post/like", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((data) => {
        data.json();
        if (!arr.find((my) => my.username === loggedUser.username)) {
          setLikesArr([
            ...likesArr,
            {
              _id: loggedUser._id,
              username: loggedUser.username,
            },
          ]);
        } else {
          setLikesArr([
            ...likesArr.filter((my) => my.username !== loggedUser.username),
          ]);
        }
      })
      .catch((er) => console.log(er));
  };

  return (
    <>
      <User
        photoUser={photoUser}
        alt={userName}
        userName={userName}
        sizePic={true}
      />
      <img onDoubleClick={like} src={src} alt={alt} />
      <div className="icons">
        <div className="svgContainer">
          {arr.find((my) => my.username === loggedUser.username) ===
          undefined ? (
            <ReactSVG
              onClick={like}
              src="/img/Posts/iconmonstr-heart-thin.svg"
              style={{ padding: "8px" }}
            />
          ) : (
            <ReactSVG
              onClick={like}
              src="/img/Posts/iconmonstr-favorite-3.svg"
              style={{ padding: "8px" }}
            />
          )}
        </div>
        <ReactSVG
          src="/img/Posts/bookmark-white.svg"
          style={{ padding: "8px" }}
        />
      </div>
      <div className="likes">
        <strong>Likes:</strong> {arr.length}
      </div>
      <ShowMore descr={description} />
      <Comments comments={commentsPost} setComments={setCommentsPost} postID={id} />
    </>
  );
};
export default Post;
