import React, { useContext } from "react";
import toast from "react-hot-toast";
import { newContext } from "../main";

const Profile = () => {
  const { user } = useContext(newContext);
  console.log(user);
  const show = () => toast.success("wow");

  return (
    <>
      <div className="w-full m-auto p-4">
        <div>
          <h1> {user?.name} </h1>
          <p> {user?.email} </p>
        </div>
        <button className="font-bold" onClick={show}>
          Click Me
        </button>
      </div>
    </>
  );
};

export default Profile;
