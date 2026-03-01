import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db';
import { refineIdea } from './gemini';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Get all items (optionally filter by type)
app.get('/items', async (req, res) => {
  const { type } = req.query;
  try {
    const items = await prisma.item.findMany({
      where: type ? { type: String(type) } : {},
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Create an item manually
app.post('/items', async (req, res) => {
  try {
    const data = req.body;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    
    const item = await prisma.item.create({
      data: {
        ...data,
        slug,
        due: data.due ? new Date(data.due) : null
      }
    });
    res.json(item);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// AI Refine + Create
app.post('/ai/refine', async (req, res) => {
  const { input } = req.body;
  const userToken = req.headers['x-gemini-token'] as string;
  const serverApiKey = process.env.GEMINI_API_KEY;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  // Use user's OAuth token if available, otherwise fallback to server API Key
  const auth = userToken || serverApiKey;

  if (!auth) {
    return res.status(500).json({ error: 'No authentication provided for Gemini' });
  }

  try {
    const structuredData = await refineIdea(input, auth);
    
    // Auto-save to DB
    const slug = structuredData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const item = await prisma.item.create({
      data: {
        ...structuredData,
        slug,
        due: structuredData.due ? new Date(structuredData.due) : null
      }
    });

    res.json(item);
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
