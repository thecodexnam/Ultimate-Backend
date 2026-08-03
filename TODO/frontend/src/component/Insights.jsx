import React, { useEffect, useState } from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import "../style/insights.css";

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass" style={{ padding: '12px', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
        <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>{`${payload[0].name}`}</p>
        <p style={{ margin: 0, color: 'var(--accent-color)' }}>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productivity-insights`, {
          credentials: "include",
        });
        const result = await res.json();
        if (result.success) setData(result);
      } catch (error) {
        console.error("Insights load error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="insights-container"><h2>Analyzing your impact... 🔍</h2></div>;
  if (!data) return <div className="insights-container"><h2>No insights available yet.</h2></div>;

  const categoryData = Object.entries(data.stats.categories || {}).map(([name, value]) => ({ name, value }));
  const priorityData = Object.entries(data.stats.priorities || {}).map(([name, value]) => ({ name, value }));

  const topCategory = Object.keys(data.stats.categories || {}).reduce((a, b) => 
    (data.stats.categories[a] > data.stats.categories[b] ? a : b), "Empty");

  const handleSendReport = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-report`, {
        method: "POST",
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        alert("✉️ Intelligence Brief sent! Check your inbox.");
      } else {
        alert(`Failed to send: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Report error:", error);
      alert("Network error: Could not reach the productivity engine.");
    }
  };

  return (
    <div className="insights-container">
      <header className="insights-header">
        <h1>Productivity Engine</h1>
        <p className="subtitle">High-fidelity analysis derived from your recent activity and Zenith AI's neural heuristics.</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Completion Velocity</span>
          <div className="stat-value">{data.stats.rate}%</div>
          <p className="subtitle" style={{fontSize: '0.9rem'}}>{data.stats.completed} Tasks Secured</p>
          <button onClick={handleSendReport} className="action-btn">
            <span>📧</span> Email Intelligence Brief
          </button>
        </div>
        <div className="stat-card">
          <span className="stat-label">Dominant Domain</span>
          <div className="stat-value" style={{fontSize: topCategory.length > 10 ? '2.5rem' : '3.5rem'}}>
            {topCategory === "Empty" ? "N/A" : topCategory}
          </div>
          <p className="subtitle" style={{fontSize: '0.9rem'}}>Your highest concentration area</p>
          <a href={`${import.meta.env.VITE_API_URL}/api/export-calendar`} target="_blank" rel="noopener noreferrer" className="action-btn">
            <span>📅</span> Synchronize Calendar
          </a>
        </div>
      </div>

      <div className="visual-analysis-grid">
        <div className="chart-card">
          <h3>Category Proliferation</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData.length > 0 ? categoryData : [{ name: 'No Data', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {categoryData.length > 0 
                    ? categoryData.map((e, i) => <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} stroke="none" />)
                    : <Cell fill="var(--glass-border)" stroke="none" />
                  }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Priority Equilibrium</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} hide />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="url(#colorBar)" 
                  radius={[10, 10, 0, 0]} 
                  animationDuration={2000}
                >
                   <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-color)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--accent-color)" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  {priorityData.map((e, i) => <Cell key={`bar-${i}`} fill={i === 0 ? '#6366f1' : i === 1 ? '#10b981' : '#f59e0b'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className="ai-report">
        <div className="coach-badge">🤖 Coach Analysis</div>
        <div className="insights-text">
          {data.insights.split('\n').filter(l => l.trim()).map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Insights;
