import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../backend/.env") });

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("GEMINI_API_KEY not found in .env");
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey });
        // The new SDK @google/genai has a specific way to list models if supported
        // If ai.models.list() doesn't exist, we might need a different approach
        // But let's try a simple generation with a very common name
        console.log("Testing gemini-1.5-flash...");
        try {
            const resp = await ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents: "Hi"
            });
            console.log("gemini-1.5-flash works!");
        } catch (e) {
            console.error("gemini-1.5-flash failed:", e.message);
        }

        console.log("Testing gemini-pro...");
        try {
            const resp = await ai.models.generateContent({
                model: "gemini-pro",
                contents: "Hi"
            });
            console.log("gemini-pro works!");
        } catch (e) {
            console.error("gemini-pro failed:", e.message);
        }
    } catch (error) {
        console.error("Diagnostic error:", error);
    }
}

listModels();
