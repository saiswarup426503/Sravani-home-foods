import { GoogleGenAI } from "@google/genai";

// IMPORTANT: This API key is read from environment variables.
// You do not need to set it manually in the code.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

export const ai = new GoogleGenAI({ apiKey });
