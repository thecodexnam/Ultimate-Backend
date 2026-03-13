import React, { useState, useEffect } from "react";
import "../style/dailyPlanner.css";

const DailyPlanner = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDailyPlan = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-plan`, {
                credentials: "include",
            });
            const data = await response.json();
            if (data.success) {
                setPlan(data.plan);
            } else {
                setError(data.message || "Failed to generate plan");
            }
        } catch (err) {
            console.error("Error fetching daily plan:", err);
            setError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyPlan();
    }, []);

    return (
        <div className="daily-planner-container">
            <h1>AI Daily Planner</h1>
            <p className="subtitle">Your optimized schedule for today (9:00 AM - 5:00 PM)</p>

            <div className="planner-controls">
                <button 
                    className="generate-btn" 
                    onClick={fetchDailyPlan} 
                    disabled={loading}
                >
                    {loading ? "Optimizing..." : "✨ Regenerate Schedule"}
                </button>
            </div>

            {loading && (
                <div className="loading-state">
                    <p>🤖 AI is organizing your day...</p>
                </div>
            )}

            {error && (
                <div className="error-state">
                    <p>⚠️ {error}</p>
                </div>
            )}

            {!loading && !error && plan.length === 0 && (
                <div className="empty-state">
                    <p>No tasks found to plan. Add some tasks first!</p>
                </div>
            )}

            {!loading && !error && plan.length > 0 && (
                <div className="plan-list">
                    {plan.map((item, index) => (
                        <div key={index} className="plan-item">
                            <div className="item-time">{item.time}</div>
                            <div className="item-activity">{item.activity}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DailyPlanner;
