import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../style/addtask.css";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    deadline: ""
  });
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/add-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Task Added Successfully ✅", result);
        navigate("/")

        // Reset form after success
        setTaskData({
          title: "",
          description: "",
          deadline: ""
        });
      } else if (response.status === 401) {
        console.log("Unauthorized request, please log in again.");
        localStorage.clear();
        navigate("/login");
      } else {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add New Task here</h1>
      <form className="add-task-form" onSubmit={handleAddTask}>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter Task Title"
            onChange={(e) =>
              setTaskData({ ...taskData, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Task Description</label>
          <textarea
            placeholder="Enter Task Description"
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-group">
          <label>Deadline</label>
          <input
            type="date"
            placeholder="Enter Deadline"
            onChange={(e) =>
              setTaskData({ ...taskData, deadline: e.target.value })
            }
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isCreating}>
          {isCreating ? "Analyzing with AI..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
