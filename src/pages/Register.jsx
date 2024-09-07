import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { newContext, server } from "../main";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(newContext);

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/register`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center m-auto p-8 bg-white text-black">
        <form
          className="w-full flex flex-col items-center"
          onSubmit={submitHandler}
          action="/register"
          method="post"
        >
          <label htmlFor="name">Name</label>
          <input
            className="w-2/5 p-3 mb-6 bg-gray-800 text-white rounded-md font-medium"
            type="text"
            placeholder="enter name..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="w-2/5 p-3 mb-6 bg-gray-800 text-white rounded-md font-medium"
            type="email"
            placeholder="enter email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="w-2/5 p-3 mb-6 bg-gray-800 text-white rounded-md font-medium"
            type="password"
            placeholder="enter password..."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="w-2/4 flex flex-row justify-around items-center p-8">
          <Link to={"/login"}>Sign in</Link>
          <button
            className="px-7 py-2 bg-blue-400 rounded-md hover:bg-green-500"
            disabled={loading}
            onClick={submitHandler}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
