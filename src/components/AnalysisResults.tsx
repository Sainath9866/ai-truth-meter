import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Brain, 
  Target,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { AnalysisResult } from "@/lib/claude-api";

interface AnalysisResultsProps {
  result: AnalysisResult;
  model: string;
}

export const AnalysisResults = ({ result, model }: AnalysisResultsProps) => {
  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-600";
    if (accuracy >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAccuracyBadgeVariant = (accuracy: number) => {
    if (accuracy >= 80) return "default";
    if (accuracy >= 60) return "secondary";
    return "destructive";
  };

  const metrics = [
    {
      name: "Factual Correctness",
      value: result.metrics.factualCorrectness,
      icon: Target,
      description: "Accuracy of facts and information"
    },
    {
      name: "Logical Consistency",
      value: result.metrics.logicalConsistency,
      icon: Brain,
      description: "Coherence and logical flow"
    },
    {
      name: "Clarity",
      value: result.metrics.clarity,
      icon: Lightbulb,
      description: "Clearness and comprehensibility"
    },
    {
      name: "Depth",
      value: result.metrics.depth,
      icon: TrendingUp,
      description: "Thoroughness and detail level"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Overall Accuracy Card */}
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6 text-primary" />
            Analysis Results for {model}
          </CardTitle>
          <CardDescription>
            Comprehensive accuracy assessment with detailed metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getAccuracyColor(result.overallAccuracy)}`}>
                  {result.overallAccuracy}%
                </div>
                <div className="text-sm text-gray-600">Overall Accuracy</div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant={getAccuracyBadgeVariant(result.overallAccuracy)} className="text-sm">
                  {result.overallAccuracy >= 80 ? "High Accuracy" : 
                   result.overallAccuracy >= 60 ? "Moderate Accuracy" : "Low Accuracy"}
                </Badge>
                <div className="text-sm text-gray-600">
                  Confidence: <span className="font-medium">{result.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Accuracy Progress</span>
              <span>{result.overallAccuracy}%</span>
            </div>
            <Progress 
              value={result.overallAccuracy} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getAccuracyColor(metric.value)}`}>
                        {metric.value}%
                      </div>
                    </div>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* What Went Wrong */}
      {result.whatWentWrong.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <XCircle className="h-5 w-5" />
                Issues Found
              </CardTitle>
              <CardDescription className="text-red-700">
                Areas that need improvement or correction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.whatWentWrong.map((issue, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* What Went Right */}
      {result.whatWentRight.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
              <CardDescription className="text-green-700">
                Positive aspects and well-executed elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.whatWentRight.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-green-800">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Detailed Analysis
            </CardTitle>
            <CardDescription>
              Comprehensive breakdown of the content analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {result.detailedAnalysis}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
