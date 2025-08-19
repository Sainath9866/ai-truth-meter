import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Send, Loader2, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Test = () => {
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accuracyNotes, setAccuracyNotes] = useState("");
  const [accuracyRating, setAccuracyRating] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question to test.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI response for now
    setTimeout(() => {
      setAiResponse(
        "The Earth is the third planet from the Sun and the only known planet in the universe with life. It has a diameter of approximately 12,742 kilometers and is composed of 71% water and 29% land. The Earth's atmosphere consists of 78% nitrogen, 21% oxygen, and trace amounts of other gases. The planet formed approximately 4.5 billion years ago through accretion from the solar nebula."
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleAccuracyRating = (rating: number) => {
    setAccuracyRating(rating);
  };

  const handleSaveResults = () => {
    if (accuracyRating === null) {
      toast({
        title: "Rating Required",
        description: "Please rate the accuracy before saving results.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Results Saved",
      description: "Your accuracy assessment has been recorded for analysis.",
    });

    // Reset form
    setQuestion("");
    setAiResponse("");
    setAccuracyNotes("");
    setAccuracyRating(null);
  };

  const accuracyOptions = [
    { value: 5, label: "Completely Accurate", color: "success", icon: CheckCircle },
    { value: 4, label: "Mostly Accurate", color: "success", icon: CheckCircle },
    { value: 3, label: "Partially Accurate", color: "warning", icon: Clock },
    { value: 2, label: "Mostly Inaccurate", color: "destructive", icon: AlertTriangle },
    { value: 1, label: "Completely Inaccurate", color: "destructive", icon: AlertTriangle },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          AI Accuracy Testing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Submit educational questions to test AI response accuracy and contribute to our research.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Question Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Submit Your Question</span>
              </CardTitle>
              <CardDescription>
                Enter an educational question to receive an AI-generated response for accuracy testing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: What is the capital of France and what is its population?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px]"
              />
              <Button 
                onClick={handleSubmitQuestion}
                disabled={isLoading || !question.trim()}
                className="w-full gradient-primary"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Response...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Get AI Response
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Response Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>AI Response</CardTitle>
              <CardDescription>
                Review the AI-generated response for accuracy and completeness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {aiResponse ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg border">
                    <p className="text-sm leading-relaxed">{aiResponse}</p>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    <Clock className="h-3 w-3 mr-1" />
                    Generated just now
                  </Badge>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Submit a question to see the AI response here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Accuracy Assessment Section */}
      {aiResponse && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>Accuracy Assessment</CardTitle>
              <CardDescription>
                Rate the accuracy of the AI response and provide your analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Accuracy Rating */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Overall Accuracy Rating</h3>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {accuracyOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = accuracyRating === option.value;
                    
                    return (
                      <motion.div
                        key={option.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          className={`h-auto p-4 flex flex-col items-center space-y-2 transition-smooth ${
                            isSelected ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => handleAccuracyRating(option.value)}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-xs font-medium text-center">
                            {option.label}
                          </span>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Notes Section */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Analysis Notes</h3>
                <Textarea
                  placeholder="Describe any inaccuracies, missing information, or areas for improvement..."
                  value={accuracyNotes}
                  onChange={(e) => setAccuracyNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Button 
                onClick={handleSaveResults}
                className="w-full gradient-primary"
                disabled={accuracyRating === null}
              >
                Save Assessment Results
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Test;