import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, Target, Users, BarChart3, CheckCircle, AlertTriangle, 
  Brain, Clock, FileText, Lightbulb, ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";

const Study = () => {
  const researchPhases = [
    {
      phase: "Phase 1",
      title: "Literature Review",
      description: "Comprehensive analysis of existing research on AI accuracy in educational contexts",
      status: "completed",
      duration: "2 months"
    },
    {
      phase: "Phase 2", 
      title: "Methodology Development",
      description: "Design of testing framework and accuracy measurement criteria",
      status: "completed",
      duration: "1 month"
    },
    {
      phase: "Phase 3",
      title: "Data Collection",
      description: "Large-scale testing with student participants across multiple subjects",
      status: "active",
      duration: "6 months"
    },
    {
      phase: "Phase 4",
      title: "Analysis & Reporting",
      description: "Statistical analysis and publication of findings",
      status: "planned",
      duration: "3 months"
    }
  ];

  const objectives = [
    {
      icon: Target,
      title: "Measure AI Accuracy",
      description: "Quantify the reliability of AI responses across different educational subjects and complexity levels."
    },
    {
      icon: Users,
      title: "Student Perspective",
      description: "Understand how students perceive and identify inaccuracies in AI-generated educational content."
    },
    {
      icon: BarChart3,
      title: "Pattern Analysis",
      description: "Identify common error patterns and subject-specific vulnerabilities in AI responses."
    },
    {
      icon: Lightbulb,
      title: "Best Practices",
      description: "Develop guidelines for educational AI use and error detection strategies."
    }
  ];

  const methodology = [
    {
      step: "1",
      title: "Question Collection",
      description: "Curated educational questions across STEM, humanities, and social sciences",
      details: ["K-12 to university level", "Multiple difficulty levels", "Fact vs. analysis questions"]
    },
    {
      step: "2", 
      title: "AI Response Generation",
      description: "Systematic collection of AI responses using standardized prompts",
      details: ["Consistent prompt format", "Multiple AI models tested", "Response time tracking"]
    },
    {
      step: "3",
      title: "Expert Validation",
      description: "Academic experts validate responses for accuracy and completeness",
      details: ["Subject matter experts", "Standardized rubrics", "Inter-rater reliability"]
    },
    {
      step: "4",
      title: "Student Assessment",
      description: "Students evaluate responses without knowing expert ratings",
      details: ["Blind assessment", "Error identification", "Confidence ratings"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <Badge variant="secondary" className="px-4 py-2">
          <BookOpen className="h-4 w-4 mr-2" />
          Research Study Overview
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Detecting Inaccuracies in AI-Generated Educational Content
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A comprehensive research study examining the reliability and accuracy of AI responses 
          in educational contexts, with a focus on student perception and error detection capabilities.
        </p>
      </motion.div>

      {/* Study Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="shadow-custom-lg gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Research Question</CardTitle>
            <CardDescription className="text-base">
              The fundamental question driving our investigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg italic font-medium text-primary border-l-4 border-primary pl-6 py-4">
              "How reliable are AI-generated responses for educational content, and can students 
              effectively identify inaccuracies in AI outputs across different academic subjects?"
            </blockquote>
          </CardContent>
        </Card>
      </motion.div>

      {/* Research Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Research Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="shadow-custom-md hover:shadow-custom-lg transition-smooth h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg gradient-primary">
                        <Icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{objective.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{objective.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Research Methodology</h2>
        <div className="space-y-6">
          {methodology.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <Card className="shadow-custom-md">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary-foreground">{step.step}</span>
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {step.details.map((detail, detailIndex) => (
                          <Badge key={detailIndex} variant="outline" className="text-xs">
                            {detail}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Research Phases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Research Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
            >
              <Card className={`shadow-custom-md border-2 transition-smooth ${
                phase.status === "active" 
                  ? "border-primary shadow-custom-lg" 
                  : phase.status === "completed"
                  ? "border-success/50"
                  : "border-border"
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        phase.status === "completed" ? "default" :
                        phase.status === "active" ? "default" : "secondary"
                      }
                      className={
                        phase.status === "completed" ? "bg-success" :
                        phase.status === "active" ? "gradient-primary" : ""
                      }
                    >
                      {phase.phase}
                    </Badge>
                    {phase.status === "completed" && <CheckCircle className="h-4 w-4 text-success" />}
                    {phase.status === "active" && <Clock className="h-4 w-4 text-primary" />}
                  </div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                  <Badge variant="outline" className="text-xs">
                    Duration: {phase.duration}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center space-y-6"
      >
        <Card className="shadow-custom-lg gradient-card border-0 p-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Participate in Our Research</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your participation helps us understand AI reliability in education. 
              Join hundreds of students already contributing to this important research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary">
                <Link to="/test" className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>Start Testing</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/analytics">View Current Results</Link>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Study;