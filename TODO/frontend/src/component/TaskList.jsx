import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/tasklist.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        credentials: 'include'
      });
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      } else if (response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setTasks(prev => prev.filter(t => t._id !== id));
      }
    } catch (error) {
      alert("Error deleting task");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected tasks?`)) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-multiple`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedIds }),
        credentials: "include",
      });
      if (response.ok) {
        setTasks(prev => prev.filter(t => !selectedIds.includes(t._id)));
        setSelectedIds([]);
      }
    } catch (error) {
      alert("Bulk delete failed");
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
        credentials: "include",
      });
      if (response.ok) {
        setTasks(prev => prev.map(t => t._id === task._id ? { ...t, status: newStatus } : t));
      }
    } catch (error) {
      console.error("Update failed");
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="task-container"><p>Feeding the coach... 🧠</p></div>;

  return (
    <div className="task-container">
      <header className="task-header-section">
        <h1 className="task-heading">Dashboard</h1>
        <div className="task-actions">
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="bulk-delete-btn">
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <Link to="/add" className="auth-btn" style={{ padding: '0.7rem 1.5rem', marginTop: 0 }}>
            + New Task
          </Link>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className="empty-container">
          <p>Your task list is empty. Ready to be productive?</p>
          <Link to="/add" className="create-link">Create your first task</Link>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task._id} className={`task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                className="select-checkbox" 
                checked={selectedIds.includes(task._id)}
                onChange={() => toggleSelect(task._id)}
              />
              
              <div className="card-header">
                <div className="card-badges">
                  <span className={`badge priority-${(task.priority || 'Medium').toLowerCase()}`}>
                    {task.priority || 'Medium'}
                  </span>
                  <span className="badge category-tag">
                    {task.category || 'General'}
                  </span>
                </div>
              </div>

              <h3 className={`task-title ${task.status === 'Completed' ? 'completed-text' : ''}`}>
                {task.title}
              </h3>
              <p className="task-description">{task.description}</p>

              <div className="task-footer">
                <span className="task-date">
                  📅 {new Date(task.deadline || task.date).toLocaleDateString()}
                </span>
                
                <div className="card-actions">
                  <button onClick={() => toggleStatus(task)} className="icon-btn action-confirm" title="Toggle Status">
                    {task.status === 'Completed' ? '↩️' : '✅'}
                  </button>
                  <Link to={`/update/${task._id}`} className="icon-btn action-edit" title="Edit Task">
                    ✏️
                  </Link>
                  <button onClick={() => handleDelete(task._id)} className="icon-btn action-delete" title="Delete Task">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
