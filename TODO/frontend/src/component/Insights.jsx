import React, { useEffect, useState } from "react";
import "../style/insights.css";

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/productivity-insights`, {
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Analyzing your productivity...</div>;
  if (!data) return <div className="error">Failed to load insights.</div>;

  return (
    <div className="insights-container">
      <header className="insights-header">
        <h1>Productivity Insights</h1>
        <p className="subtitle">AI-powered analysis of your work habits</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card glass">
          <h3>Completion Rate</h3>
          <div className="stat-value">{data.stats.rate}%</div>
          <div className="stat-label">{data.stats.completed} of {data.stats.total} tasks done</div>
        </div>
        <div className="stat-card glass">
          <h3>Top Category</h3>
          <div className="stat-value">
            {Object.keys(data.stats.categories || {}).reduce((a, b) => 
               (data.stats.categories[a] > data.stats.categories[b] ? a : b), "N/A")}
          </div>
          <div className="stat-label">Most active focus area</div>
        </div>
      </div>

      <section className="ai-insights-section glass">
        <h2>🧠 AI Analysis</h2>
        <div className="insights-text">
          {data.insights.split('\n').filter(line => line.trim()).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </section>

      <section className="breakdown-section">
        <div className="breakdown-card glass">
          <h3>Category Distribution</h3>
          <ul>
            {Object.entries(data.stats.categories || {}).map(([cat, count]) => (
              <li key={cat}>
                <span>{cat}</span>
                <span className="count-badge">{count}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="breakdown-card glass">
          <h3>Priority Breakdown</h3>
          <ul>
            {Object.entries(data.stats.priorities || {}).map(([prio, count]) => (
              <li key={prio}>
                <span>{prio}</span>
                <span className={`count-badge priority-${prio.toLowerCase()}`}>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Insights;
