import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/updateTask.css";

export default function UpdateTask() {

  const navigate = useNavigate();
  const { id } = useParams();   // ✅ Get ID from URL

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });
  const [subtasks, setSubtasks] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);


  // Fetch existing task data on component mount
  useEffect(() => {
    fetch(`http://localhost:4000/api/task/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched task data:", data);

        setTaskData({
          title: data.title,
          description: data.description,
          priority: data.priority,
          category: data.category,
          estimatedHours: data.estimatedHours
        });
        setSubtasks(data.subtasks || []);
      });
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/task/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
        credentials: "include",
      })

      const data = await response.json()
      console.log(data)

      if (data.success) {
        navigate("/")
      }
      alert(data.message)

    } catch (error) {
      console.log("error", error)
    }
  }

  const handleGenerateSubtasks = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`http://localhost:4000/api/task/${id}/generate-subtasks`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSubtasks(data.subtasks);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error generating subtasks:", error);
      alert("Failed to generate subtasks");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleSubtask = async (subtaskId, currentStatus) => {
    setSubtasks(prev => prev.map(st => st._id === subtaskId ? { ...st, completed: !currentStatus } : st));
    try {
      const response = await fetch(`http://localhost:4000/api/task/${id}/subtask/${subtaskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !currentStatus }),
        credentials: 'include'
      });
      const data = await response.json();
      if (!data.success) {
        setSubtasks(prev => prev.map(st => st._id === subtaskId ? { ...st, completed: currentStatus } : st));
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating subtask:", error);
      setSubtasks(prev => prev.map(st => st._id === subtaskId ? { ...st, completed: currentStatus } : st));
      alert("Failed to update subtask");
    }
  };

  const getAIAdvice = async () => {
    setIsFetchingAdvice(true);
    try {
      const response = await fetch(`http://localhost:4000/api/task/${id}/advice`, {
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        setAdvice(data.advice);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching advice:", error);
      alert("Failed to get AI advice");
    } finally {
      setIsFetchingAdvice(false);
    }
  };


  return (
    <div className="container">
      <h1>Update Task</h1>
      <label>Title</label>
      <input
        value={taskData.title}
        onChange={(e) =>
          setTaskData({ ...taskData, title: e.target.value })
        }
      />

      <label>Description</label>
      <textarea
        value={taskData.description}
        onChange={(e) =>
          setTaskData({ ...taskData, description: e.target.value })
        }
      ></textarea>

      {taskData.priority && (
        <div className="ai-inferred-details">
          <p><strong>🧠 AI Insights:</strong></p>
          <div className="insight-tags">
            <span className={`badge priority-${(taskData.priority || '').toLowerCase()}`}>Priority: {taskData.priority}</span>
            <span className="category-badge">Category: {taskData.category}</span>
            <span className="hours-badge">Est. Hours: {taskData.estimatedHours}h</span>
          </div>
        </div>
      )}

      <button className="submit" onClick={handleUpdate}>
        Update Task
      </button>

      <div className="subtasks-section">
        <h3>Subtasks (AI Generated)</h3>
        {subtasks.length === 0 ? (
          <button
            className="ai-btn"
            onClick={handleGenerateSubtasks}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "✨ Generate AI Breakdown"}
          </button>
        ) : (
          <ul className="subtasks-list">
            {subtasks.map((st) => (
              <li key={st._id} className={st.completed ? "completed" : ""}>
                <label className="subtask-label">
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => toggleSubtask(st._id, st.completed)}
                  />
                  <span>{st.title}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="advice-section">
        <h3>Procrastination Buster</h3>
        {!advice ? (
          <button
            className="ai-btn advice-btn"
            onClick={getAIAdvice}
            disabled={isFetchingAdvice}
          >
            {isFetchingAdvice ? "Thinking..." : "💡 Get AI Advice"}
          </button>
        ) : (
          <div className="advice-box">
            <p className="advice-tip"><strong>Tip:</strong> {advice.tip}</p>
            <p className="advice-action"><strong>First Step:</strong> {advice.action}</p>
            <button className="clear-advice" onClick={() => setAdvice(null)}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
