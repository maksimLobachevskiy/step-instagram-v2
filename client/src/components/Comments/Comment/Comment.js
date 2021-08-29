import React from "react";
import { useHistory } from "react-router-dom";
const Comment = (props) => {
  const history = useHistory();
  const { comment, user } = props;
  const userName = user ? user[0].username : comment.by.username;

  return (
    <div className='comment'>
      <div className='comment__wrapper'>
        <a href={`/user/${userName}`}>
          <img
            src={
              (user ? user[0].userimg : comment.by.userimg) ||
              "https://res.cloudinary.com/dn1sljbzi/image/upload/v1626209088/profile-pic_r6huys.jpg"
            }
            alt={`${userName}'s profile`}
          />
        </a>
        <a href={`/user/${userName}`}>
          <p
            onClick={() => history.push(`/user/${userName}`)}
            className='comment__username'
          >
            {userName}
          </p>
        </a>
        <p className='comment__body'>{comment.comment}</p>
      </div>
    </div>
  );
};
export default Comment;
