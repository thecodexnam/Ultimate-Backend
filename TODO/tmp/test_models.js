import "dotenv/config";

const MODELS_TO_TRY = [
    "google/gemini-2.0-flash-exp:free",
    "google/gemini-flash-1.5:free", 
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "meta-llama/llama-3.2-3b-instruct:free",
];

async function testModel(model) {
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
            model,
            messages: [{ role: "user", content: "Say hello in one word." }],
        }),
    });
    const data = await response.json();
    if (response.ok) {
        console.log(`✅ ${model} -> "${data.choices[0].message.content.trim()}"`);
        return true;
    } else {
        console.log(`❌ ${model} -> ${response.status}: ${data.error?.message || JSON.stringify(data.error)}`);
        return false;
    }
}

(async () => {
    console.log("Testing OpenRouter models...\n");
    for (const model of MODELS_TO_TRY) {
        const ok = await testModel(model);
        if (ok) break; // stop at first working model
    }
})();
