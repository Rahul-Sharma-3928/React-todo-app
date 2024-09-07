import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { newContext, server } from "../main";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(newContext);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successfully...");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setIsAuthenticated(true);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-3 px-8 bg-blue-500 ">
        <div className="font-extrabold cursor-pointer">
          <img src="/todoapp/public/logo.png" alt="logo" />
        </div>
        <div className="flex gap-x-8 font-bold">
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>

          {isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
