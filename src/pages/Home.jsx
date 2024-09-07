import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { newContext, server } from "../main";
import toast from "react-hot-toast";
import TodoItems from "../components/TodoItems";
import { Navigate } from "react-router-dom";

const Home = () => {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(newContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.tasks);
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.success(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) {
    <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="bg-white">
        <form
          className="p-10 m-auto flex flex-col justify-between items-center"
          onSubmit={submitHandler}
          action="/login"
          method="post"
        >
          <input
            className="w-2/4 m-4 p-4 rounded-md font-bold"
            type="text"
            placeholder="title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-2/4 m-4 p-4 rounded-md font-bold"
            type="text"
            placeholder="description..."
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
        <div className="w-full flex flex-row justify-center items-center gap-4 p-8">
          <button
            className="px-8 py-3  bg-blue-600 rounded-md hover:bg-green-600"
            disabled={loading}
            onClick={submitHandler}
          >
            Add Task
          </button>
        </div>
        <section>
          {tasks.map((i) => (
            // <div key={i._id}>{i.title}</div>
            <TodoItems
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              id={i._id}
              key={i._id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
