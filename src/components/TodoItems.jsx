import axios from "axios";
import React, { useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const TodoItems = ({ title, description, isCompleted, id }) => {
  const [refresh, setRefresh] = useState(false);

  const updateItem = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/update/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {}, [refresh]);

  return (
    <div>
      <div>
        <h4> {title} </h4>
        <p> {description} </p>
      </div>
      <div>
        <input type="checkbox" checked={isCompleted} onClick={updateItem(id)} />
        <button onClick={deleteItem(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItems;
