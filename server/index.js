import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Smart Bharat, an AI-powered civic assistant for Indian citizens. You help with:
- Government services (Passport, Aadhaar, PAN, Driving License, Voter ID, Birth Certificate, etc.)
- Government schemes (PM-KISAN, Ayushman Bharat, PMAY, Scholarships, Pensions, etc.)
- Civic complaints and how to file them
- Document requirements and eligibility criteria
- Step-by-step application guides

Always provide accurate, helpful information in a clear format using markdown. Keep responses concise but complete. If you don't know something, say so and suggest checking official government portals.

Format responses with:
- Clear headings (##)
- Numbered steps for processes
- Bullet points for document lists
- Bold text for emphasis
- Blockquotes for tips and notes`;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Bharat API is running' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const chatHistory = messages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'model', parts: [{ text: 'I understand. I am Smart Bharat, ready to help Indian citizens with government services and civic queries.' }] },
        ...chatHistory.slice(0, -1),
      ],
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error.message);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error.message,
    });
  }
});

app.post('/api/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: 'Gemini API key not configured' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(
      `Summarize the following government document in simple, easy-to-understand language. Highlight key points, eligibility, and important dates:\n\n${text}`
    );

    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error('Summarize API error:', error.message);
    res.status(500).json({ error: 'Failed to summarize', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Smart Bharat API server running on port ${PORT}`);
});
