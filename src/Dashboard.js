import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/api/tasks", {
      title
    });
    fetchTasks();
  };

  const updateTask = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      <input placeholder="New Task" onChange={(e) => setTitle(e.target.value)} />
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