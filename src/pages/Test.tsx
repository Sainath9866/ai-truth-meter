import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Loader2, Search, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const AnalysisStepSchema = z.object({
  step_number: z.number(),
  title: z.string(),
  verdict: z.enum(["accurate", "partially_accurate", "inaccurate", "unclear"]),
  explanation: z.string(),
  issues_found: z.array(z.string()),
  suggested_correction: z.string().optional()
});

const AnalysisResultSchema = z.object({
  overall_verdict: z.enum(["accurate", "partially_accurate", "inaccurate"]),
  confidence_score: z.number().min(0).max(100),
  analysis_steps: z.array(AnalysisStepSchema),
  summary: z.string(),
  educational_reliability: z.enum(["high", "medium", "low"])
});

type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

const Test = () => {
  const [content, setContent] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyzeContent = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");
    setAnalysisResult(null);
    
    try {
      const { data, error: functionError } = await supabase.functions.invoke('analyze-content', {
        body: { content }
      });

      if (functionError) {
        throw functionError;
      }

      const validatedResult = AnalysisResultSchema.parse(data);
      setAnalysisResult(validatedResult);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze content');
    } finally {
      setLoading(false);
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "accurate":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "partially_accurate":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "inaccurate":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "accurate":
        return "bg-green-50 border-green-200 text-green-800";
      case "partially_accurate":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "inaccurate":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

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
            AI Content Accuracy Detector
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Paste AI-generated content below and get an automated accuracy analysis with detailed reasoning
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Content Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Generated Content Analysis
                </CardTitle>
                <CardDescription>
                  Paste the AI-generated content you want to analyze for accuracy and reliability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste AI-generated content here... (e.g., educational explanations, facts, research summaries)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[160px]"
                />
                <Button 
                  onClick={handleAnalyzeContent}
                  disabled={loading || !content.trim()}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Content Accuracy
                    </>
                  )}
                </Button>
                {error && (
                  <div className="text-red-600 text-sm mt-2 p-3 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Results Section */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Overall Verdict */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Overall Analysis Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getVerdictIcon(analysisResult.overall_verdict)}
                      <div>
                        <Badge className={getVerdictColor(analysisResult.overall_verdict)}>
                          {analysisResult.overall_verdict.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">
                          Educational Reliability: <span className="font-medium">{analysisResult.educational_reliability}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{analysisResult.confidence_score}%</div>
                      <div className="text-sm text-gray-600">Confidence</div>
                    </div>
                  </div>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{analysisResult.summary}</p>
                </CardContent>
              </Card>

              {/* Detailed Analysis Steps */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Analysis Steps</h3>
                {analysisResult.analysis_steps.map((step, index) => (
                  <motion.div
                    key={step.step_number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-lg">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {step.step_number}
                          </div>
                          {step.title}
                          {getVerdictIcon(step.verdict)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Badge className={getVerdictColor(step.verdict)}>
                          {step.verdict.replace('_', ' ').toUpperCase()}
                        </Badge>
                        
                        <p className="text-gray-700">{step.explanation}</p>
                        
                        {step.issues_found.length > 0 && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Issues Found:</h4>
                            <ul className="space-y-1">
                              {step.issues_found.map((issue, issueIndex) => (
                                <li key={issueIndex} className="text-red-600 text-sm flex items-start gap-2">
                                  <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {step.suggested_correction && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-1">Suggested Correction:</h4>
                            <p className="text-blue-800 text-sm">{step.suggested_correction}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Test;