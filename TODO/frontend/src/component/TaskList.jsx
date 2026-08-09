import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/tasklist.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple summary values make the dashboard easier to scan at a glance.
  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks || []);
      } else if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      alert('Error deleting task');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected tasks?`)) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/delete-multiple`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedIds }),
        credentials: 'include',
      });

      if (response.ok) {
        setTasks((prev) => prev.filter((task) => !selectedIds.includes(task._id)));
        setSelectedIds([]);
      }
    } catch (error) {
      alert('Bulk delete failed');
    }
  };

  const toggleStatus = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
        credentials: 'include',
      });

      if (response.ok) {
        setTasks((prev) => prev.map((item) => (item._id === task._id ? { ...item, status: nextStatus } : item)));
      }
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const formatDate = (value) => {
    if (!value) return 'No deadline';

    const parsedDate = new Date(value);
    return Number.isNaN(parsedDate.getTime()) ? 'No deadline' : parsedDate.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="task-container">
        <div className="loading-state">
          <p>Loading your workspace...</p>
          <span>Preparing your next move.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="task-container">
      <header className="task-header-section">
        <div>
          <p className="eyebrow">Focus dashboard</p>
          <h1 className="task-heading">Plan your week with clarity</h1>
          <p className="task-subtitle">Keep momentum high with quick updates and a calmer view of what matters.</p>
        </div>

        <div className="task-actions">
          {selectedIds.length > 0 && (
            <button onClick={handleBulkDelete} className="bulk-delete-btn">
              Delete Selected ({selectedIds.length})
            </button>
          )}
          <Link to="/add" className="primary-btn">
            + New Task
          </Link>
        </div>
      </header>

      <section className="summary-grid">
        <article className="summary-card highlight">
          <span className="summary-label">Total Tasks</span>
          <strong className="summary-value">{summary.total}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-label">Completed</span>
          <strong className="summary-value">{summary.completed}</strong>
        </article>
        <article className="summary-card">
          <span className="summary-label">Pending</span>
          <strong className="summary-value">{summary.pending}</strong>
        </article>
      </section>

      {tasks.length === 0 ? (
        <div className="empty-container">
          <p>Your task list is empty. Ready to be productive?</p>
          <Link to="/add" className="create-link">Create your first task</Link>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => {
            const isCompleted = task.status === 'Completed';

            return (
              <div key={task._id} className={`task-card ${isCompleted ? 'completed' : ''}`}>
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
                    <span className="badge category-tag">{task.category || 'General'}</span>
                  </div>
                </div>

                <h3 className={`task-title ${isCompleted ? 'completed-text' : ''}`}>{task.title}</h3>
                <p className="task-description">{task.description}</p>

                <div className="task-footer">
                  <span className="task-date">📅 {formatDate(task.deadline || task.date)}</span>

                  <div className="card-actions">
                    <button onClick={() => toggleStatus(task)} className="icon-btn action-confirm" title="Toggle Status">
                      {isCompleted ? '↩️' : '✅'}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
