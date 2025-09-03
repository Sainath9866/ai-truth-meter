import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, AlertCircle, Loader2, Search, Brain, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProgressPopup } from "@/components/ProgressPopup";
import { AnalysisResults } from "@/components/AnalysisResults";
import { analyzeContent, saveAnalysisToHistory, AnalysisResult, AnalysisHistory } from "@/lib/claude-api";

// Popular AI models for selection
const AI_MODELS = [
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", description: "Anthropic's latest model" },
  { id: "gpt-4o", name: "GPT-4o", description: "OpenAI's flagship model" },
  { id: "gpt-4", name: "GPT-4", description: "OpenAI's advanced model" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "Google's most capable model" },
  { id: "mistral-large", name: "Mistral Large", description: "Mistral's premium model" },
  { id: "llama-3-70b", name: "LLaMA 3 70B", description: "Meta's large language model" }
];

const Test = () => {
  const [content, setContent] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAnalyzeContent = async () => {
    if (!content.trim() || !selectedModel) return;

    setLoading(true);
    setError("");
    setAnalysisResult(null);
    setShowProgress(true);
    setCurrentStep(1);
    
    try {
      // Simulate progress steps
      const progressSteps = [1, 2, 3, 4];
      for (const step of progressSteps) {
        setCurrentStep(step);
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate processing time
      }

      const result = await analyzeContent({
        content,
        model: selectedModel
      });

      setAnalysisResult(result);

      // Save to history
      const historyEntry: AnalysisHistory = {
        id: Date.now().toString(),
        model: selectedModel,
        content: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
        result,
        timestamp: Date.now(),
        cost: 0.01 // Estimated cost
      };

      saveAnalysisToHistory(historyEntry);

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze content');
    } finally {
      setLoading(false);
      setShowProgress(false);
      setCurrentStep(1);
    }
  };

  const selectedModelInfo = AI_MODELS.find(model => model.id === selectedModel);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI Truth Meter
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the AI model and paste AI-generated content below to get an automated accuracy analysis with detailed reasoning
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Model Selection and Content Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-lg border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Content Analysis
                </CardTitle>
                <CardDescription>
                  Select the AI model and paste the content you want to analyze for accuracy and reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select AI Model *
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose the AI model that generated this content" />
                    </SelectTrigger>
                    <SelectContent>
                      {AI_MODELS.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{model.name}</span>
                            <span className="text-sm text-gray-500">{model.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedModelInfo && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/20"
                    >
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm text-primary font-medium">
                        Selected: {selectedModelInfo.name}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Content Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    AI-Generated Content *
                  </label>
                  <Textarea
                    placeholder="Paste AI-generated content here... (e.g., educational explanations, facts, research summaries)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[160px] resize-none"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Content will be automatically truncated to optimize API costs</span>
                    <span>{content.length} characters</span>
                  </div>
                </div>

                {/* Analyze Button */}
                <Button 
                  onClick={handleAnalyzeContent}
                  disabled={loading || !content.trim() || !selectedModel}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Analyze Content Accuracy
                    </>
                  )}
                </Button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm p-4 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Analysis Error</span>
                    </div>
                    <p className="mt-1">{error}</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Results Section */}
          {analysisResult && selectedModel && (
            <AnalysisResults result={analysisResult} model={selectedModel} />
          )}
        </div>
      </main>

      {/* Progress Popup */}
      <ProgressPopup 
        isOpen={showProgress} 
        currentStep={currentStep} 
        onComplete={() => setShowProgress(false)} 
      />

      <Footer />
    </div>
  );
};

export default Test;