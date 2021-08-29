import React, { useState } from "react";
import Comment from "./Comment/Comment";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const { comments, setChangeModal, setComments, postID } = props;
  const [showComments, setShowComments] = useState(false);
  const { allUsersData } = useSelector((store) => ({
    allUsersData: store.allUsers.allUsersData
  }));

  const arr = comments;
  const elArr = showComments ? arr : [arr[arr.length - 1]];

  const handleClick = () => {
    setShowComments(!showComments);
  };

  const loggedUser = useSelector((state) => state.loggedUser);
  const [commentNew, setCommentNew] = useState("");
  const onChange = (e) => {
    setCommentNew(e.target.value);
  };
  const createComment = async (e) => {
    e.preventDefault();
    try {
      fetch("/api/post/postcomment", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          postId: postID,
          postedBy: loggedUser._id,
          comment: commentNew
        })
      })
        .then((data) => {
          data.json();
          setComments([
            ...props.comments,
            {
              _id: postID,
              by: loggedUser,
              comment: commentNew
            }
          ]);
          {
            setChangeModal && setChangeModal(true);
          }
        })
        .then((data) => {
          setCommentNew("");
          {
            setChangeModal && setChangeModal(false);
          }
        });
    } catch (err) {}
  };
  return (
    <div className='wrapperComments'>
      <h5>Комментарии</h5>
      {arr.length !== 1 && props.comments && (
        <button className='wrapperComments__button' onClick={handleClick}>
          {!showComments
            ? "Показать все комментарии: "
            : "Скрыть все комментарии"}
          {!showComments && props.comments && arr.length}
        </button>
      )}
      {elArr.map((comment) => {
        if (!comment.by.hasOwnProperty("username")) {
          return (
            <div key={comment._id}>
              <Comment
                comment={comment}
                user={allUsersData.users.filter(
                  (user) => user._id === comment.by
                )}
              />
            </div>
          );
        } else {
          return (
            <div key={comment._id}>
              <Comment comment={comment} />
            </div>
          );
        }
        return false;
      })}
      <div className='createComment-form'>
        <form className='comment-form' onSubmit={createComment}>
          <input
            onChange={onChange}
            name='comment'
            required={true}
            id='comment__field'
            placeholder='Add Comment'
            value={commentNew}
          />
          <button type='submit'>></button>
        </form>
      </div>
    </div>
  );
};
export default Comments;
