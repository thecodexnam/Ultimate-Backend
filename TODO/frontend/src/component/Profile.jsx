import React, { useState, useEffect } from "react";
import "../style/profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (data.success) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="profile-container"><h2>Loading your journey... 🚀</h2></div>;
    if (!user) return <div className="profile-container"><h2>Please log in to see your profile.</h2></div>;

    // Calculate XP needed for next level based on the formula: Level = floor(sqrt(xp/25)) + 1
    // So next level XP needed: (Level^2) * 25
    const nextLevelXP = Math.pow(user.level, 2) * 25;
    const prevLevelXP = Math.pow(user.level - 1, 2) * 25;
    const progress = Math.min(100, ((user.xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="avatar-circle">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="profile-name">{user.name}</h1>
                    <div className="profile-rank">Rank: {user.rank}</div>
                </div>

                <div className="xp-progress-container">
                    <div className="xp-label">
                        <span>Level {user.level}</span>
                        <span>{user.xp} / {nextLevelXP} XP</span>
                    </div>
                    <div className="xp-bar-outer">
                        <div className="xp-bar-inner" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <div className="stats-grid-premium">
                    <div className="stat-item-premium">
                        <span className="stat-val">{user.level}</span>
                        <span className="stat-lbl">Level</span>
                    </div>
                    <div className="stat-item-premium">
                        <span className="stat-val">{user.xp}</span>
                        <span className="stat-lbl">Total XP</span>
                    </div>
                    <div className="stat-item-premium">
                        <span className="stat-val">{user.rank.split(' ')[0]}</span>
                        <span className="stat-lbl">Expertise</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
