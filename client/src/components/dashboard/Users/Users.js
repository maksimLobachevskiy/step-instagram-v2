import React, { useState } from "react";
import User from "./User/User";
import { useSelector } from "react-redux";

const Users = (props) => {
  const { loggedUser } = useSelector((store) => ({
    loggedUser: store.loggedUser
  }));

  const [follow, setFollow] = useState(false);
  const [test, setTest] = useState(false);
  const { username, userimg } = loggedUser;
  const [followName, setFollowName] = useState([]);

  const handleFollow = (username, id) => {
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

    setFollowName([...followName, id]);
    setTest(false);
  };

  return (
    <div className='users'>
      <div className='users__current'>
        <User photoUser={userimg} alt={"man"} userName={username} />
      </div>
      <div>
        <div className='users__block'>
          <div>Following:</div>
          {props.allUsersData.users.map((data) => (
            <div key={data._id}>
              {!data._id.includes(loggedUser._id) &&
                loggedUser.following.includes(data._id) && (
                  <User
                    userName={data.username}
                    altName={data.username}
                    photoUser={data.userimg}
                  />
                )}
            </div>
          ))}
        </div>{" "}
        <div className='users__block'>
          <div>Recommendations:</div>
          {props.allUsersData.users.length===loggedUser.following.length? <h5>No recommendations</h5>:""}
          {props.allUsersData.users.map((data) => (
            <div className='users__blockIcon' key={data._id}>
              {!data._id.includes(loggedUser._id) &&
                !loggedUser.following.includes(data._id) && (
                  <User
                    userName={data.username}
                    altName={data.username}
                    photoUser={data.userimg}
                    handleFollow={handleFollow}
                    data={data}
                    unFollowUsers={
                      !data._id.includes(loggedUser._id) &&
                      !loggedUser.following.includes(data._id)
                    }
                  />
                )} </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Users;
