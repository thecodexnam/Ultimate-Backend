import Task from "../models/Task.js";
import { GoogleGenAI } from "@google/genai";

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

        if (process.env.GEMINI_API_KEY) {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: 'v1' });

                const prompt = `Analyze the following task and categorize it. 
Task Title: ${title}
Task Description: ${description}

Return ONLY a valid JSON object with exactly three keys: 
1. "priority" (must be exactly "High", "Medium", or "Low")
2. "category" (a 1-2 word string like "Development", "Personal", "Errands", "Bug Fix", etc.)
3. "estimatedHours" (a number representing estimated hours to complete).
Do not include markdown formatting, backticks, or any other text.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-1.5-flash',
                    contents: prompt,
                });

                const textResponse = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
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
                console.error("AI Categorization failed, using defaults:", aiError);
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

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: "GEMINI_API_KEY is missing in backend" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: 'v1' });

        const prompt = `Break down the following task into 3 to 5 actionable subtasks.
Task Title: ${task.title}
Task Description: ${task.description}

Return ONLY a valid JSON array of strings representing the subtask titles. For example: ["Buy groceries", "Cook dinner", "Eat dinner"]. Do not include markdown formatting, backticks, or any other text.`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        let subtasksArr = [];
        try {
            const textResponse = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
            subtasksArr = JSON.parse(textResponse);
        } catch (err) {
            console.error("AI parsing error:", err, "Response was:", response.text);
            return res.status(500).json({ success: false, message: "Failed to parse AI response" });
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
        console.error("GenAI Error:", error);
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

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ success: false, message: "GEMINI_API_KEY is missing" });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, apiVersion: 'v1' });

        const prompt = `Based on the task titled "${task.title}" and description "${task.description}", give me:
1. A 1-sentence motivational tip to help the user get started.
2. A precise, 1-step "micro-action" they can take in under 2 minutes to start this task right now.

Return ONLY a valid JSON object with two keys: "tip" and "action". Do not include markdown formatting or backticks.`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt,
        });

        let advice = { tip: "Start small.", action: "Just open the task." };
        try {
            const textResponse = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
            advice = JSON.parse(textResponse);
        } catch (err) {
            console.error("Advice parsing error:", err, "Response was:", response.text);
            // Fallback is already set
        }

        res.status(200).json({
            success: true,
            advice
        });

    } catch (error) {
        console.error("AI Advice Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
