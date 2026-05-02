import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://team-task-backend-28oz.onrender.com/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks");
    }
  };

  const addTask = async () => {
    try {
      await axios.post("https://team-task-backend-28oz.onrender.com/api/tasks", {
        title
      });
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task");
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(`https://team-task-backend-28oz.onrender.com/api/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.status}
            <button onClick={() => updateTask(task._id, "done")}>
              Mark Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;