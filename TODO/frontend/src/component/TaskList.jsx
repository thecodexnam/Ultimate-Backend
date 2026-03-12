import React, { useEffect, useState } from "react";
import "../style/tasklist.css";
import { Link, useNavigate } from "react-router-dom";

const TaskList = () => {
  const [taskData, setTaskData] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        credentials: 'include' // include cookies for auth
      });
      const list = await response.json();

      if (response.ok) {
        setTaskData(list.tasks);
      } else if (response.status === 401) {
        console.log("Unauthorized request, redirecting to login...");
        // Handle 401 by redirecting user to login if their token expired
        localStorage.clear();
        window.location.href = "/login";
      } else {
        console.log("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("Item Deleted");
        // Remove deleted item from UI instantly
        setTaskData((prev) => prev.filter((task) => task._id !== id));
      } else {
        console.log("Delete failed:", data);
        alert("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task");
    }
  };

  const selectAll = (e) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      let items = taskData.map((item) => item._id);
      setSelectedTasks(items);
      console.log(items);
    } else {
      setSelectedTasks([]);
    }
  };

  const selectSingleItem = (e, id) => {
    if (selectedTasks.includes(id)) {
      let items = selectedTasks.filter((item) => item !== id);
      setSelectedTasks(items);
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const deletelMultiple = async () => {
    if (selectedTasks.length === 0) {
      alert("Please select tasks to delete");
      return;
    }
    console.log(selectedTasks);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-multiple`, {
        method: "DELETE",
        body: JSON.stringify({ id: selectedTasks }),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTaskData((prev) => prev.filter((task) => !selectedTasks.includes(task._id)));
        setSelectedTasks([]);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete tasks");
    }
  }

  const toggleComplete = async (id, currentStatus) => {
    const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, completedAt: newStatus === "Completed" ? new Date() : null }),
        credentials: "include",
      });
      if (response.ok) {
        setTaskData((prev) => prev.map((task) => task._id === id ? { ...task, status: newStatus } : task));
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="task-container">
      <h1 className="task-heading">TO DO LIST</h1>
      <button onClick={deletelMultiple} className="delete-btn">Delete</button>
      {taskData.length === 0 ? (
        <div className="empty-state">
          <p>
            No tasks yet. <Link to="/add">Create one!</Link>
          </p>
        </div>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={selectAll} />
              </th>
              <th>S.no</th>
              <th>Title</th>
              <th>Status</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {taskData.map((item, index) => (
              <tr key={item._id} className={`task-row ${item.status === 'Completed' ? 'row-completed' : ''}`}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(item._id)}
                    onChange={(e) => selectSingleItem(e, item._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td className="task-title-cell">
                  <span className={item.status === 'Completed' ? 'completed-text' : ''}>
                    {item.title}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${(item.status || 'Pending').toLowerCase()}`}>
                    {item.status || "Pending"}
                  </span>
                </td>
                <td>
                  <span className="category-badge">{item.category || "General"}</span>
                </td>
                <td>
                  <span className={`badge priority-${(item.priority || 'Medium').toLowerCase()}`}>
                    {item.priority || "Medium"}
                  </span>
                </td>
                <td>{new Date(item.deadline || item.date).toLocaleDateString()}</td>
                <td className="action-cell">
                  <button 
                    onClick={() => toggleComplete(item._id, item.status)}
                    className={`complete-btn ${item.status === 'Completed' ? 'undo' : ''}`}
                  >
                    {item.status === "Completed" ? "Undo" : "Complete"}
                  </button>
                  <Link to={`/update/${item._id}`} className="update-btn">
                    Update
                  </Link>
                  <button
                    onClick={() => deleteTask(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;
