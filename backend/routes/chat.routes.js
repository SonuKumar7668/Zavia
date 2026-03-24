const express = require("express");
//const Chat = require("../models/Chat");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Send message to Gemini API & save to DB
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    console.log("💡 Initializing Google GenAI client...");

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "models/gemini-2.5-flash-lite" });

    // const prompt = `
    // You are a professional mentor AI assistant for carrer guidence. 
    // Respond accordingly to the user's message, maintaining context and clarity , also suggest 2 to 3 careers about what user is asking do not answer any inappropriate questions.    
    //   User:${message}
    // `;

      const prompt = `You are a professional AI assistant for carrier guidence and any job related queries. 
    Respond accordingly to the user's message, maintaining context and clarity , also suggest 2 to 3 careers or job titles about what user is asking do not answer any inappropriate questions.
    User:${message}
    `;

    // const prompt = `
    // You are a helpful and friendly AI assistant. Respond naturally to the user's message, maintaining context and clarity.
    // User: ${message}

    // `

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 512, // limit output to ~256 tokens (~200 words)
      }
    });
    const text = result.response.text();

    if (!text) {
      console.log("⚠️ No response text from Gemini API");
      return res.status(500).json({ error: "No response from Gemini API" });
    }

    // ✅ Save chat to MongoDB
    //const chat = new Chat({ userMessage: message, botReply: text });
    //await chat.save();

    console.log("✅ AI Response saved to MongoDB");

    return res.json({ reply: text });
  } catch (err) {
    console.error("Gemini API Error:", err?.response?.data || err.message || err);
    return res.status(500).json({ error: "Error contacting Gemini API" });
  }

});

// Get previous chats
// router.get("/", async (req, res) => {
//   try {
//     const chats = await Chat.find().sort({ createdAt: -1 }).limit(20);
//     res.json(chats);
//   } catch (err) {
//     console.error("❌ Error fetching chats:", err.message);
//     res.status(500).json({ error: "Unable to fetch chats" });
//   }
// });

module.exports = router;
