import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/form.css";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState({ title: "", description: "" });
  const [subtasks, setSubtasks] = useState([]);
  const [advice, setAdvice] = useState(null);
  
  const [uiState, setUiState] = useState({
    updating: false,
    generating: false,
    fetchingAdvice: false
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setTask(data);
        setSubtasks(data.subtasks || []);
      });
  }, [id]);

  const handleUpdate = async () => {
    setUiState(prev => ({ ...prev, updating: true }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
        credentials: "include",
      });
      if (res.ok) navigate("/");
    } catch (err) {
      alert("Update failed");
    } finally {
      setUiState(prev => ({ ...prev, updating: false }));
    }
  };

  const generateSubtasks = async () => {
    setUiState(prev => ({ ...prev, generating: true }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}/generate-subtasks`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setSubtasks(data.subtasks);
    } finally {
      setUiState(prev => ({ ...prev, generating: false }));
    }
  };

  const toggleSubtask = async (stId, current) => {
    setSubtasks(prev => prev.map(s => s._id === stId ? { ...s, completed: !current } : s));
    await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}/subtask/${stId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !current }),
      credentials: 'include'
    });
  };

  const getAdvice = async () => {
    setUiState(prev => ({ ...prev, fetchingAdvice: true }));
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/task/${id}/advice`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setAdvice(data.advice);
    } finally {
      setUiState(prev => ({ ...prev, fetchingAdvice: false }));
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-heading">Refine Task</h1>

      <div className="main-form">
        <div className="form-row">
          <label>Title</label>
          <input 
            value={task.title} 
            onChange={e => setTask({...task, title: e.target.value})} 
          />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea 
            value={task.description} 
            onChange={e => setTask({...task, description: e.target.value})} 
          />
        </div>

        <button className="submit-btn-premium" onClick={handleUpdate} disabled={uiState.updating}>
          {uiState.updating ? "Saving Changes..." : "Update Task"}
        </button>
      </div>

      {/* AI Breakdown Section */}
      <div className="ai-section-card">
        <h3>✨ AI Breakdown</h3>
        {subtasks.length === 0 ? (
          <button className="ai-btn-outline" onClick={generateSubtasks} disabled={uiState.generating}>
            {uiState.generating ? "Breaking it down..." : "Generate Subtasks"}
          </button>
        ) : (
          <div className="subtasks-list">
            {subtasks.map(st => (
              <div key={st._id} className={`subtask-item ${st.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={st.completed} 
                  onChange={() => toggleSubtask(st._id, st.completed)} 
                />
                <span>{st.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Advice Section */}
      <div className="ai-section-card" style={{ borderLeftColor: 'var(--success-color)' }}>
        <h3>💡 Procrastination Buster</h3>
        {!advice ? (
          <button className="ai-btn-outline" onClick={getAdvice} disabled={uiState.fetchingAdvice}>
            {uiState.fetchingAdvice ? "Analyzing..." : "Get AI Advice"}
          </button>
        ) : (
          <div className="advice-box-premium">
            <p><strong>Coach says:</strong> {advice.tip}</p>
            <p><strong>Micro-Action:</strong> {advice.action}</p>
            <button className="icon-btn" style={{marginTop: '0.5rem'}} onClick={() => setAdvice(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateTask;
