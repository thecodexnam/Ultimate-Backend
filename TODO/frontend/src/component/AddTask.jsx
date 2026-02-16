import React, { useState } from "react";
import "../style/addtask.css";

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Task Added Successfully ✅", result);

        // Reset form after success
        setTaskData({
          title: "",
          description: "",
        });
      } else {
        console.log("Error:", result.message);
      }
    } catch (error) {
      console.log("Server Error:", error.message);
    }
  };

  return (
    <div className="add-task-container">
      <h1>Add New Task</h1>

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

        <button type="submit" className="submit-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
