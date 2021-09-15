import React from "react";
import "./UserAvatar.css";
import userImage from '../../../images/User.png'

const UserAvatar = ({ user }) => {
  return (
    <>
    {/* {console.log("user", user.picture)} */}
      <img
        src={userImage}
        alt={user.name}
        title={user.name}
        className={"avatar"}
      ></img>
    </>
  );
};

export default UserAvatar;
