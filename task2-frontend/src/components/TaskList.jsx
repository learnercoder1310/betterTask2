import { useEffect, useState } from "react";
import API from "../api";
import "./TaskList.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newDesc = prompt("Enter new description:");
    if (!newTitle) return;

    try {
      const response = await API.put(`/tasks/${id}`, {
        title: newTitle,
        description: newDesc,
      });
      setTasks(tasks.map((t) => (t.id === id ? response.data : t)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="task-container">
      <h2>My Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-content">
                <strong className="task-title">{task.title}</strong>
                <p className="task-desc">{task.description}</p>
                <small className="task-date">
                  Created: {new Date(task.created_at).toLocaleString()}
                </small>
              </div>
              <div className="task-buttons">
                <button className="edit-btn" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



