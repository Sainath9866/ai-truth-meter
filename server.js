import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client once
const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

// Test endpoint to verify API key
app.get('/api/test', async (req, res) => {
  try {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Claude API key not found' });
    }

    console.log('Testing API key:', apiKey.substring(0, 10) + '...');
    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 32,
      temperature: 0,
      messages: [
        { role: 'user', content: 'Say "Hello"' }
      ]
    });

    if (!msg?.content?.[0]?.text) {
      return res.status(500).json({ error: 'Invalid response format from Claude API' });
    }

    res.json({ success: true, message: 'API key is working!', response: msg });
    
  } catch (error) {
    console.error('Test Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Claude API proxy endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { content, model } = req.body;
    const apiKey = process.env.CLAUDE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Claude API key not found' });
    }

    const prompt = `You are an AI accuracy analyzer. Analyze the following AI-generated content from ${model} for accuracy and provide a detailed assessment.

Content to analyze:
"${content}"

Please provide a JSON response with the following structure:
{
  "overallAccuracy": number (0-100),
  "metrics": {
    "factualCorrectness": number (0-100),
    "logicalConsistency": number (0-100), 
    "clarity": number (0-100),
    "depth": number (0-100)
  },
  "whatWentWrong": ["specific issue 1", "specific issue 2"],
  "whatWentRight": ["positive aspect 1", "positive aspect 2"],
  "detailedAnalysis": "comprehensive analysis text",
  "confidence": number (0-100)
}

Focus on:
- Factual accuracy and correctness
- Logical flow and consistency
- Clarity of expression
- Depth of information
- Identify specific errors or inaccuracies
- Highlight strengths and good aspects

Keep the response concise but thorough.`;

    console.log('Sending request to Claude API with key:', apiKey.substring(0, 10) + '...');

    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      temperature: 0,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    if (!msg?.content?.[0]?.text) {
      throw new Error('Invalid response format from Claude API');
    }

    // Parse the JSON response
    const analysisText = msg.content[0].text;
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    const result = JSON.parse(jsonMatch[0]);
    
    // Validate and sanitize the result
    const analysisResult = {
      overallAccuracy: Math.max(0, Math.min(100, result.overallAccuracy || 0)),
      metrics: {
        factualCorrectness: Math.max(0, Math.min(100, result.metrics?.factualCorrectness || 0)),
        logicalConsistency: Math.max(0, Math.min(100, result.metrics?.logicalConsistency || 0)),
        clarity: Math.max(0, Math.min(100, result.metrics?.clarity || 0)),
        depth: Math.max(0, Math.min(100, result.metrics?.depth || 0))
      },
      whatWentWrong: Array.isArray(result.whatWentWrong) ? result.whatWentWrong : [],
      whatWentRight: Array.isArray(result.whatWentRight) ? result.whatWentRight : [],
      detailedAnalysis: result.detailedAnalysis || 'No detailed analysis provided.',
      confidence: Math.max(0, Math.min(100, result.confidence || 0))
    };

    res.json(analysisResult);

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Claude API proxy is ready!');
});
