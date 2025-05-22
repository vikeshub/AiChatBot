import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables.");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Store conversation context here (simple in-memory for all users)
let conversationHistory = [
  {
    role: "user",
    content: "You can start the chat now.",
  },
];
interface Message {
  role: string;
  content: string;
}
// Convert history to Gemini messages format
function toGeminiMessages(history: Message[]) {
  return history.map((msg: Message) => ({
    role: msg.role === "assistant" ? "model" : msg.role,
    parts: [{ text: msg.content }],
  }));
}

app.post("/api/messages", async (req, res) => {
  const { message } = req.body;

  try {
    // Add new user message to history
    conversationHistory.push({ role: "user", content: message });

    // Convert entire conversation to Gemini format
    const messages = toGeminiMessages(conversationHistory);

    // Call Gemini with full conversation context
    const result = await model.generateContent({ contents: messages });
    const response =  result.response;
    const replyText = response.text();

    // Add assistant reply to history
    conversationHistory.push({ role: "assistant", content: replyText });

    res.json({ reply: replyText });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
