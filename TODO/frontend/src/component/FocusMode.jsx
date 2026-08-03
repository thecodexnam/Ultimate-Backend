import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../style/focusMode.css";

const FocusMode = () => {
    // Timer Config
    const [customTimes, setCustomTimes] = useState({
        focus: 25,
        short: 5,
        long: 15
    });
    const [isEditing, setIsEditing] = useState(false);

    const MODES = useMemo(() => ({
        focus: { label: "Deep Focus", seconds: customTimes.focus * 60, color: "var(--accent-color)" },
        short: { label: "Brief Reprieve", seconds: customTimes.short * 60, color: "var(--emerald-400)" },
        long: { label: "Extended Rest", seconds: customTimes.long * 60, color: "var(--indigo-400)" }
    }), [customTimes]);

    const [secondsLeft, setSecondsLeft] = useState(MODES.focus.seconds);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("focus");
    const [showReward, setShowReward] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState("");

    const tips = [
        "Your focus is the ultimate currency of the digital age.",
        "Precision in intent leads to mastery in execution.",
        "The neural core is active. Silence the periphery.",
        "Zenith AI detects peak cognitive potential in this session.",
        "Every second of focus is a brick in the temple of progress."
    ];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, { credentials: "include" });
            const data = await res.json();
            if (data.success) setTasks(data.tasks.filter(t => t.status !== "Completed"));
        } catch (err) {
            console.error("Task fetch error:", err);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => setSecondsLeft(p => p - 1), 1000);
        } else if (secondsLeft === 0 && isActive) {
            handleComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, secondsLeft]);

    const handleComplete = async () => {
        setIsActive(false);
        if (mode === "focus") {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/award-focus-xp`, {
                    method: "POST",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    setShowReward(true);
                    setTimeout(() => setShowReward(false), 8000);
                }
            } catch (err) {
                console.error("XP award failed", err);
            }
        }
        resetTimer(mode);
    };

    const resetTimer = (newMode) => {
        setIsActive(false);
        setMode(newMode);
        setSecondsLeft(MODES[newMode].seconds);
        setShowReward(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    // Circular Progress Calculation
    const totalSeconds = MODES[mode].seconds;
    const percentage = (secondsLeft / totalSeconds) * 100;
    const strokeDashoffset = 440 - (440 * percentage) / 100;

    const selectedTaskData = tasks.find(t => t._id === selectedTask);
    const recommendedSessions = selectedTaskData ? Math.ceil((selectedTaskData.estimatedHours * 60) / 25) : null;

    return (
        <div className="focus-neural-container">
            <AnimatePresence mode="wait">
                {!isActive && (
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="zenith-heading"
                    >
                        Neural Focus Core
                    </motion.h1>
                )}
            </AnimatePresence>

            <div className={`focus-nexus glass ${isActive ? 'focus-active' : ''}`}>
                <header className="nexus-header">
                   <div className="mode-pill-container">
                        {Object.keys(MODES).map((k) => (
                            <button 
                                key={k}
                                className={`mode-pill ${mode === k ? 'active' : ''}`}
                                onClick={() => resetTimer(k)}
                                disabled={isActive || isEditing}
                            >
                                {MODES[k].label}
                            </button>
                        ))}
                   </div>
                   {!isActive && (
                       <button 
                           className={`edit-toggle-btn ${isEditing ? 'active' : ''}`}
                           onClick={() => setIsEditing(!isEditing)}
                       >
                           {isEditing ? "SAVE CONFIG" : "EDIT INTERVALS"}
                       </button>
                   )}
                </header>

                <AnimatePresence>
                    {isEditing ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="time-editor-grid"
                        >
                            {Object.keys(customTimes).map((k) => (
                                <div key={k} className="editor-group">
                                    <label>{k.toUpperCase()}</label>
                                    <input 
                                        type="number" 
                                        value={customTimes[k]} 
                                        onChange={(e) => {
                                            const val = Math.max(1, parseInt(e.target.value) || 1);
                                            setCustomTimes(prev => ({ ...prev, [k]: val }));
                                            if (mode === k) setSecondsLeft(val * 60);
                                        }}
                                    />
                                    <span>MIN</span>
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="visual-timer-container">
                            <svg className="timer-svg" viewBox="0 0 160 160">
                                <circle className="timer-bg" cx="80" cy="80" r="70" />
                                <motion.circle 
                                    className="timer-progress" 
                                    cx="80" cy="80" r="70" 
                                    style={{ 
                                        strokeDasharray: 440,
                                        strokeDashoffset: strokeDashoffset,
                                        stroke: MODES[mode].color
                                    }}
                                    initial={false}
                                    transition={{ duration: 1, ease: "linear" }}
                                />
                            </svg>
                            <div className="timer-content">
                                <div className="time-remaining">{formatTime(secondsLeft)}</div>
                                <div className="session-status">{isActive ? "SYNCHRONIZING..." : "STANDBY"}</div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                {!isEditing && (
                    <div className="neural-controls">
                        <button 
                            onClick={() => setIsActive(!isActive)} 
                            className={`core-btn ${isActive ? 'active' : ''}`}
                        >
                            {isActive ? "PAUSE INTERFACE" : "INITIALIZE FOCUS"}
                        </button>
                        {!isActive && secondsLeft !== MODES[mode].seconds && (
                            <button onClick={() => resetTimer(mode)} className="reset-btn">
                                RESET CORE
                            </button>
                        )}
                    </div>
                )}

                <AnimatePresence>
                    {!isActive && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="task-layer"
                        >
                            <select 
                                value={selectedTask} 
                                onChange={(e) => setSelectedTask(e.target.value)} 
                                className="neural-select"
                            >
                                <option value="">Select Operational Directive...</option>
                                {tasks.map(t => (
                                    <option key={t._id} value={t._id}>{t.title}</option>
                                ))}
                            </select>
                            {recommendedSessions && (
                                <div className="neural-advisory">
                                    <span>🧠 Advisory:</span> Predicted session load: {recommendedSessions} cycles.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {showReward && (
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="reward-manifest"
                    >
                        ⚡ NEURAL SYNC COMPLETE. +50 XP ARCHIVED.
                    </motion.div>
                )}
            </div>

            <div className="coach-transmission">
                <div className="transmission-line"></div>
                <div className="transmission-content">
                    <span className="label">ZENITH AI TRANSMISSION</span>
                    <p>"{tips[Math.floor(Date.now() / 60000) % tips.length]}"</p>
                </div>
            </div>
        </div>
    );
};

export default FocusMode;

