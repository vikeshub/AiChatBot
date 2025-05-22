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

// Store conversation context (simple in-memory for now)
let conversationHistory = [
  {
    role: "user",
    content:
      "You are an assistant with access to real-time information provided by the user. Always use the current date and time provided when answering time-related questions.",
  },
];

interface Message {
  role: string;
  content: string;
}

// Convert to Gemini format
function toGeminiMessages(history: Message[]) {
  return history.map((msg: Message) => ({
    role: msg.role === "assistant" ? "model" : msg.role,
    parts: [{ text: msg.content }],
  }));
}

app.post("/api/messages", async (req, res) => {
  const { message } = req.body;

  try {
    // Get current date/time (IST)
    const now = new Date();
    const dateTimeString = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    // Inject real-time info only if message includes date/time keywords
    const lowerMsg = message.toLowerCase();
    const dateKeywords = ["date", "time", "day", "today", "current"];
    const includesTimeQuery = dateKeywords.some((kw) =>
      lowerMsg.includes(kw)
    );

    if (includesTimeQuery) {
      conversationHistory.push({
        role: "user",
        content: `Current real-time date and time is: ${dateTimeString}`,
      });
    }

    // Add user message
    conversationHistory.push({ role: "user", content: message });

    // Convert to Gemini format
    const messages = toGeminiMessages(conversationHistory);

    // Generate reply
    const result = await model.generateContent({ contents: messages });
    const replyText = result.response.text();

    // Add assistant's reply
    conversationHistory.push({ role: "assistant", content: replyText });

    res.json({ reply: replyText });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
