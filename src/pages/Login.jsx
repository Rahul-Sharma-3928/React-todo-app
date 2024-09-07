import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { newContext, server } from "../main";
import axios from "axios";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(newContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        { email, password },
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
          action="/login"
          method="post"
        >
          <label htmlFor="email">Email</label>
          <input
            className="w-2/5 p-3 mb-6 bg-gray-800 text-white rounded-md font-medium"
            type="email"
            placeholder="enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            className="w-2/5 p-3 bg-gray-800 text-white rounded-md font-medium"
            type="password"
            placeholder="enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className="w-2/4 flex flex-row justify-around p-8">
          <button
            className="px-7 py-2 bg-blue-500 rounded-md hover:bg-green-500"
            disabled={loading}
            onClick={submitHandler}
          >
            Sign in
          </button>
          <Link to={"/register"}>Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
