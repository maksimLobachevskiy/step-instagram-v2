import React, {useState} from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const { sizePic, alt, userName, photoUser,unFollowUsers,handleFollow,data } = props;
const [open,setOpen]=useState(false)
  return (
    <>
      <Link to={`/user/${userName}`} className={sizePic ? "user min" : "user"}>
        <img
          src={
            photoUser ||
            "https://res.cloudinary.com/dn1sljbzi/image/upload/v1626209088/profile-pic_r6huys.jpg"
          }
          alt={alt}
        />
        <div>{userName}</div>
      </Link>
        {unFollowUsers&&<button
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            className='btn blue accent-3'
            onClick={() => {handleFollow(data.username, data._id)
                setOpen(!open)
            }}
        >
            {open
                ?"unFollow":"Follow"}
        </button>}
    </>
  );
};
export default User;
