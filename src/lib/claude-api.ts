// Claude API integration with cost optimization
export interface AnalysisRequest {
  content: string;
  model: string;
}

export interface AnalysisMetrics {
  factualCorrectness: number;
  logicalConsistency: number;
  clarity: number;
  depth: number;
}

export interface AnalysisResult {
  overallAccuracy: number;
  metrics: AnalysisMetrics;
  whatWentWrong: string[];
  whatWentRight: string[];
  detailedAnalysis: string;
  confidence: number;
}

export interface AnalysisHistory {
  id: string;
  model: string;
  content: string;
  result: AnalysisResult;
  timestamp: number;
  cost: number;
}

// Truncate content to limit tokens and cost
const truncateContent = (content: string, maxTokens: number = 500): string => {
  // Rough estimation: 1 token ≈ 4 characters
  const maxChars = maxTokens * 4;
  if (content.length <= maxChars) return content;
  
  // Truncate at word boundary
  const truncated = content.substring(0, maxChars);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};

// Calculate estimated cost (Claude 3.5 Sonnet pricing)
const calculateCost = (inputTokens: number, outputTokens: number): number => {
  const inputCostPer1k = 0.003; // $3 per 1M tokens
  const outputCostPer1k = 0.015; // $15 per 1M tokens
  
  return (inputTokens / 1000) * inputCostPer1k + (outputTokens / 1000) * outputCostPer1k;
};

export const analyzeContent = async (request: AnalysisRequest): Promise<AnalysisResult> => {

  // Truncate content to limit cost
  const truncatedContent = truncateContent(request.content);
  
  const prompt = `You are an AI accuracy analyzer. Analyze the following AI-generated content from ${request.model} for accuracy and provide a detailed assessment.

Content to analyze:
"${truncatedContent}"

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

  try {
    const response = await fetch('http://localhost:3001/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: truncatedContent,
        model: request.model
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // The server already returns the parsed result, so we can use it directly
    return {
      overallAccuracy: Math.max(0, Math.min(100, data.overallAccuracy || 0)),
      metrics: {
        factualCorrectness: Math.max(0, Math.min(100, data.metrics?.factualCorrectness || 0)),
        logicalConsistency: Math.max(0, Math.min(100, data.metrics?.logicalConsistency || 0)),
        clarity: Math.max(0, Math.min(100, data.metrics?.clarity || 0)),
        depth: Math.max(0, Math.min(100, data.metrics?.depth || 0))
      },
      whatWentWrong: Array.isArray(data.whatWentWrong) ? data.whatWentWrong : [],
      whatWentRight: Array.isArray(data.whatWentRight) ? data.whatWentRight : [],
      detailedAnalysis: data.detailedAnalysis || 'No detailed analysis provided.',
      confidence: Math.max(0, Math.min(100, data.confidence || 0))
    };

  } catch (error) {
    console.error('Claude API Error:', error);
    throw new Error(`Failed to analyze content: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Local storage management
export const saveAnalysisToHistory = (analysis: AnalysisHistory): void => {
  try {
    const history = getAnalysisHistory();
    history.unshift(analysis);
    
    // Keep only last 100 analyses to prevent storage bloat
    const limitedHistory = history.slice(0, 100);
    
    localStorage.setItem('ai-truth-meter-history', JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Failed to save analysis to history:', error);
  }
};

export const getAnalysisHistory = (): AnalysisHistory[] => {
  try {
    const history = localStorage.getItem('ai-truth-meter-history');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Failed to load analysis history:', error);
    return [];
  }
};

export const clearAnalysisHistory = (): void => {
  try {
    localStorage.removeItem('ai-truth-meter-history');
  } catch (error) {
    console.error('Failed to clear analysis history:', error);
  }
};
