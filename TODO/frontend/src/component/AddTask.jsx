import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/form.css";

const AddTask = () => {
  const [task, setTask] = useState({ title: "", description: "", deadline: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/add-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/");
      } else if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Create New Task</h1>
      
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            required
            placeholder="What needs to be done?"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            required
            placeholder="Provide some details for the AI coach..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>

        <div className="form-row">
          <label>Deadline</label>
          <input
            type="date"
            required
            value={task.deadline}
            onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-btn-premium" disabled={loading}>
          {loading ? "Coach is thinking... 🧠" : "Save Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
