const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors({
    origin: "https://book-sphere-dun.vercel.app/api/generate", // allows the frontend to access this API
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
})); // Allows the frontend to call this API
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.ApiKey);

app.post("/generate", async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const response = result.response.candidates[0].content.parts[0].text;
        
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Error generating response" });
    }
});

module.exports = (req, res) => app(req, res);
