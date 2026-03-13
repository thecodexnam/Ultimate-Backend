import Task from "../models/Task.js";

// Free model confirmed working on this OpenRouter account
const OPENROUTER_MODEL = "openrouter/hunter-alpha";

// Helper: call OpenRouter with a prompt and return the text response
async function callOpenRouter(prompt) {
    const apiKey = process.env.OPEN_ROUTER;
    if (!apiKey) throw new Error("OPEN_ROUTER API key is missing from .env");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
            "X-Title": "TODO App",
        },
        body: JSON.stringify({
            model: OPENROUTER_MODEL,
            messages: [{ role: "user", content: prompt }],
        }),
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`OpenRouter API error ${response.status}: ${errBody}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

export const createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: "Title and Description are required",
                success: false,
            });
        }

        let aiData = {
            priority: "Medium",
            category: "General",
            estimatedHours: 0
        };

        if (process.env.OPEN_ROUTER) {
            try {
                const prompt = `Analyze the following task and categorize it. 
Task Title: ${title}
Task Description: ${description}

Return ONLY a valid JSON object with exactly three keys: 
1. "priority" (must be exactly "High", "Medium", or "Low")
2. "category" (a 1-2 word string like "Development", "Personal", "Errands", "Bug Fix", etc.)
3. "estimatedHours" (a number representing estimated hours to complete).
Do not include markdown formatting, backticks, or any other text.`;

                const text = await callOpenRouter(prompt);
                const textResponse = text.replace(/```json/gi, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(textResponse);

                if (["High", "Medium", "Low"].includes(parsed.priority)) {
                    aiData.priority = parsed.priority;
                }
                if (parsed.category) {
                    aiData.category = parsed.category;
                }
                if (typeof parsed.estimatedHours === 'number') {
                    aiData.estimatedHours = parsed.estimatedHours;
                }
            } catch (aiError) {
                console.error("AI Categorization failed, using defaults:", aiError.message);
            }
        }

        const newTask = await Task.create({
            title,
            description,
            deadline,
            priority: aiData.priority,
            category: aiData.category,
            estimatedHours: aiData.estimatedHours,
            userId: req.user.id,
        });

        return res.status(201).json({
            message: "Task Created Successfully",
            task: newTask,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        return res.status(200).json({
            message: "Tasks fetched successfully",
            tasks,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const getSingleTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found or unauthorized",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found or unauthorized",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Task Deleted Successfully",
            task: deletedTask,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};

export const deleteMultipleTasks = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || !Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID array",
            });
        }

        const result = await Task.deleteMany({
            _id: { $in: id },
            userId: req.user.id
        });

        res.status(200).json({
            success: true,
            message: "Tasks deleted successfully",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const generateSubTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.subtasks && task.subtasks.length > 0) {
            return res.status(400).json({ success: false, message: "Subtasks already exist" });
        }

        if (!process.env.OPEN_ROUTER) {
            return res.status(500).json({ success: false, message: "OPEN_ROUTER API key is missing in backend .env" });
        }

        const prompt = `Break down the following task into 3 to 5 actionable subtasks.
Task Title: ${task.title}
Task Description: ${task.description}

Return ONLY a valid JSON array of strings representing the subtask titles. For example: ["Buy groceries", "Cook dinner", "Eat dinner"]. Do not include markdown formatting, backticks, or any other text.`;

        let subtasksArr = [];
        try {
            const text = await callOpenRouter(prompt);
            const textResponse = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            subtasksArr = JSON.parse(textResponse);
        } catch (err) {
            console.error("AI subtask parsing error:", err.message);
            return res.status(500).json({ success: false, message: "Failed to parse AI response for subtasks" });
        }

        const newSubtasks = subtasksArr.map(st => ({ title: st, completed: false }));
        task.subtasks = newSubtasks;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Subtasks generated successfully",
            subtasks: task.subtasks,
        });

    } catch (error) {
        console.error("Generate Subtasks Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateSubTaskStatus = async (req, res) => {
    try {
        const { id, subtaskId } = req.params;
        const { completed } = req.body;

        const task = await Task.findOne({ _id: id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        const subtask = task.subtasks.id(subtaskId);
        if (!subtask) {
            return res.status(404).json({ success: false, message: "Subtask not found" });
        }

        subtask.completed = completed;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Subtask updated successfully",
            subtask,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getTaskAdvice = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        if (!process.env.OPEN_ROUTER) {
            return res.status(500).json({ success: false, message: "OPEN_ROUTER API key is missing in backend .env" });
        }

        const prompt = `Based on the task titled "${task.title}" and description "${task.description}", give me:
1. A 1-sentence motivational tip to help the user get started.
2. A precise, 1-step "micro-action" they can take in under 2 minutes to start this task right now.

Return ONLY a valid JSON object with two keys: "tip" and "action". Do not include markdown formatting or backticks.`;

        let advice = { tip: "Start small.", action: "Just open the task." };
        try {
            const text = await callOpenRouter(prompt);
            const textResponse = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            advice = JSON.parse(textResponse);
        } catch (err) {
            console.error("Advice parsing error:", err.message);
            // Fallback is already set
        }

        res.status(200).json({
            success: true,
            advice
        });

    } catch (error) {
        console.error("AI Advice Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const generateDailyPlan = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        if (tasks.length === 0) {
            return res.status(200).json({ success: true, plan: [], message: "No tasks to plan!" });
        }

        const taskListStr = tasks.map(t => `- ${t.title}: ${t.description} (Priority: ${t.priority}, Est: ${t.estimatedHours}h)`).join('\n');

        const prompt = `You are an expert productivity coach. Create a structured daily schedule for today (9:00 AM to 5:00 PM) based on these tasks:
${taskListStr}

Rules:
1. Allocate realistic time blocks (30, 60, or 90 minutes).
2. Include a 1-hour lunch break around 12:00 PM or 1:00 PM.
3. Prioritize High priority tasks.
4. If there are too many tasks, pick the most important ones for today and mention it.
5. Return ONLY a valid JSON array of objects. Each object must have "time" (e.g., "09:00 AM - 10:00 AM") and "activity" (the task title or break name) and "task_id" (the _id of the task if applicable, else null).
Do not include markdown formatting or backticks.`;

        let plan = [];
        try {
            const text = await callOpenRouter(prompt);
            const textResponse = text.replace(/```json/gi, '').replace(/```/g, '').trim();
            plan = JSON.parse(textResponse);
        } catch (err) {
            console.error("Daily Plan parsing error:", err.message);
            return res.status(500).json({ success: false, message: "Failed to generate daily plan" });
        }

        res.status(200).json({
            success: true,
            plan
        });

    } catch (error) {
        console.error("Daily Plan Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductivityInsights = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        if (tasks.length === 0) {
            return res.status(200).json({
                success: true,
                insights: "No tasks found to analyze. Start by creating some tasks!",
                stats: { completed: 0, total: 0, rate: 0 }
            });
        }

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === "Completed").length;
        const completionRate = ((completedTasks / totalTasks) * 100).toFixed(1);

        const categoryCounts = {};
        tasks.forEach(t => {
            categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
        });

        const priorityCounts = { High: 0, Medium: 0, Low: 0 };
        tasks.forEach(t => {
            priorityCounts[t.priority] = (priorityCounts[t.priority] || 0) + 1;
        });

        const statsStr = `Total Tasks: ${totalTasks}, Completed: ${completedTasks}, Rate: ${completionRate}%. Categories: ${JSON.stringify(categoryCounts)}. Priorities: ${JSON.stringify(priorityCounts)}.`;

        const prompt = `Analyze these productivity stats and give 3-4 bullet points of high-level insights and 1 actionable tip for improvement. Keep it professional yet encouraging.
Stats: ${statsStr}

Return ONLY the bullet points as plain text. No JSON, no markdown code blocks.`;

        let insights = "Keep going! You're doing great.";
        try {
            insights = await callOpenRouter(prompt);
        } catch (err) {
            console.error("Insights AI Error:", err.message);
        }

        res.status(200).json({
            success: true,
            insights,
            stats: {
                total: totalTasks,
                completed: completedTasks,
                rate: completionRate,
                categories: categoryCounts,
                priorities: priorityCounts
            }
        });
    } catch (error) {
        console.error("Insights Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

