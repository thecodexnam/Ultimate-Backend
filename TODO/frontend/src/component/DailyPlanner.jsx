import React, { useState, useEffect } from "react";
import "../style/dailyPlanner.css";

const DailyPlanner = () => {
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDailyPlan = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-plan`, {
                credentials: "include",
            });
            const data = await response.json();
            if (data.success) setPlan(data.plan);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyPlan();
    }, []);

    return (
        <div className="daily-planner-container">
            <header className="planner-header">
                <h1>Coach's Daily Plan</h1>
                <p className="subtitle">Your AI-optimized workflow for a productive today.</p>
            </header>

            <div className="planner-controls">
                <button className="auth-btn" style={{marginTop: 0}} onClick={fetchDailyPlan} disabled={loading}>
                    {loading ? "Re-optimizing..." : "✨ Refresh Schedule"}
                </button>
            </div>

            {loading ? (
                <div className="loader-container">
                    <h2>🧠 Coach is strategizing...</h2>
                    <p>Building your perfect 9-to-5 schedule based on priorities.</p>
                </div>
            ) : plan.length === 0 ? (
                <div className="empty-container">
                    <p>No tasks found to organize. Head to the Dashboard to add some!</p>
                </div>
            ) : (
                <div className="timeline">
                    <div className="planner-coach-tip">
                        <span>💡</span>
                        <p>Focus on your High-priority blocks first. Coach has allocated realistic time for deep work.</p>
                    </div>
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
