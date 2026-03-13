import "dotenv/config";

const OPENROUTER_MODEL = "openrouter/hunter-alpha";

async function callOpenRouter(prompt) {
    const apiKey = process.env.OPEN_ROUTER;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
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

(async () => {
    console.log("=== Testing AI Daily Planner Generation ===\n");
    
    const tasks = [
        { title: "Fix login bug", description: "Users cannot log in when their email has uppercase letters.", priority: "High", estimatedHours: 2 },
        { title: "Buy groceries", description: "Need milk, eggs, bread, and fruits.", priority: "Low", estimatedHours: 1 },
        { title: "Review PR #42", description: "Code review for the new analytics dashboard.", priority: "Medium", estimatedHours: 3 },
    ];

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

    try {
        const text = await callOpenRouter(prompt);
        console.log("Raw AI response:", text);
        const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
        const plan = JSON.parse(cleaned);
        
        console.log("\n✅ Plan Generated successfully:\n");
        plan.forEach(item => {
            console.log(`[${item.time}] ${item.activity}`);
        });
    } catch (err) {
        console.error("❌ Failed:", err.message);
    }
})();
