import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, TrendingDown, Award, AlertTriangle, CheckCircle, 
  Brain, Users, Target, BarChart3, Download, Share, RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  const overallStats = {
    totalTests: 2847,
    averageAccuracy: 82.4,
    totalParticipants: 1234,
    completedAssessments: 8429,
    improveThisMonth: 3.2
  };

  const subjectResults = [
    { 
      subject: "Mathematics", 
      accuracy: 87, 
      tests: 542, 
      trend: "up",
      change: 2.1,
      commonErrors: ["Calculation mistakes", "Formula misapplication"],
      reliabilityScore: "A"
    },
    { 
      subject: "Physics", 
      accuracy: 84, 
      tests: 398, 
      trend: "up",
      change: 1.8,
      commonErrors: ["Conceptual confusion", "Unit errors"],
      reliabilityScore: "A-"
    },
    { 
      subject: "History", 
      accuracy: 76, 
      tests: 445, 
      trend: "up",
      change: 4.2,
      commonErrors: ["Date inaccuracies", "Context missing"],
      reliabilityScore: "B+"
    },
    { 
      subject: "Literature", 
      accuracy: 78, 
      tests: 321, 
      trend: "down",
      change: -1.2,
      commonErrors: ["Interpretation bias", "Citation errors"],
      reliabilityScore: "B+"
    },
    { 
      subject: "Chemistry", 
      accuracy: 89, 
      tests: 267, 
      trend: "up",
      change: 3.1,
      commonErrors: ["Reaction mechanisms", "Nomenclature"],
      reliabilityScore: "A"
    },
    { 
      subject: "Geography", 
      accuracy: 81, 
      tests: 234, 
      trend: "up",
      change: 2.8,
      commonErrors: ["Statistical outdated", "Regional specifics"],
      reliabilityScore: "B+"
    }
  ];

  const keyFindings = [
    {
      title: "STEM Subjects Excel",
      description: "Mathematics and sciences consistently show higher accuracy rates (85%+)",
      impact: "high",
      icon: Target
    },
    {
      title: "Context Matters",
      description: "Questions requiring cultural or recent context show lower accuracy",
      impact: "medium", 
      icon: AlertTriangle
    },
    {
      title: "Improving Trends",
      description: "Overall accuracy has improved 13% over the past 6 months",
      impact: "high",
      icon: TrendingUp
    },
    {
      title: "Student Detection",
      description: "Students identify 68% of inaccuracies without expert guidance",
      impact: "medium",
      icon: Users
    }
  ];

  const getReliabilityColor = (score: string) => {
    switch(score) {
      case "A": return "text-success";
      case "A-": return "text-success";
      case "B+": return "text-warning";
      case "B": return "text-warning";
      default: return "text-destructive";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Research Results Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive findings from our AI accuracy research across educational subjects and student assessments.
        </p>
      </motion.div>

      {/* Overall Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="shadow-custom-lg gradient-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-2xl">Study Overview</span>
              <Badge variant="secondary" className="px-3 py-1">
                <RefreshCw className="h-3 w-3 mr-1" />
                Live Results
              </Badge>
            </CardTitle>
            <CardDescription>
              Real-time aggregated results from all participants and testing sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center space-y-2">
                <Brain className="h-8 w-8 mx-auto text-primary" />
                <p className="text-2xl font-bold">{overallStats.totalTests.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-success" />
                <p className="text-2xl font-bold">{overallStats.averageAccuracy}%</p>
                <p className="text-sm text-muted-foreground">Average Accuracy</p>
              </div>
              <div className="text-center space-y-2">
                <Users className="h-8 w-8 mx-auto text-primary" />
                <p className="text-2xl font-bold">{overallStats.totalParticipants.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Participants</p>
              </div>
              <div className="text-center space-y-2">
                <BarChart3 className="h-8 w-8 mx-auto text-warning" />
                <p className="text-2xl font-bold">{overallStats.completedAssessments.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Assessments</p>
              </div>
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 mx-auto text-success" />
                <p className="text-2xl font-bold">+{overallStats.improveThisMonth}%</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-by-Subject Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Subject Performance</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjectResults.map((result, index) => {
            const TrendIcon = result.trend === "up" ? TrendingUp : TrendingDown;
            const trendColor = result.trend === "up" ? "text-success" : "text-destructive";
            
            return (
              <motion.div
                key={result.subject}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="shadow-custom-md hover:shadow-custom-lg transition-smooth">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{result.subject}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`${getReliabilityColor(result.reliabilityScore)} border-current`}
                        >
                          {result.reliabilityScore}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                          <span className={`text-sm ${trendColor}`}>
                            {result.change > 0 ? "+" : ""}{result.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy Rate</span>
                        <span className="font-medium">{result.accuracy}%</span>
                      </div>
                      <Progress value={result.accuracy} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {result.tests} tests completed
                      </p>
                      <div>
                        <p className="text-sm font-medium mb-1">Common Error Types:</p>
                        <div className="flex flex-wrap gap-1">
                          {result.commonErrors.map((error, errorIndex) => (
                            <Badge key={errorIndex} variant="secondary" className="text-xs">
                              {error}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Key Findings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Key Research Findings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyFindings.map((finding, index) => {
            const Icon = finding.icon;
            const impactColor = finding.impact === "high" ? "success" : 
                               finding.impact === "medium" ? "warning" : "destructive";
            
            return (
              <motion.div
                key={finding.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="shadow-custom-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        impactColor === "success" ? "bg-success/10" :
                        impactColor === "warning" ? "bg-warning/10" : "bg-destructive/10"
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          impactColor === "success" ? "text-success" :
                          impactColor === "warning" ? "text-warning" : "text-destructive"
                        }`} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{finding.title}</h3>
                          <Badge 
                            variant={impactColor === "success" ? "default" : "outline"}
                            className={`text-xs ${
                              impactColor === "success" ? "bg-success" :
                              impactColor === "warning" ? "text-warning border-warning" :
                              "text-destructive border-destructive"
                            }`}
                          >
                            {finding.impact} impact
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{finding.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="shadow-custom-lg gradient-card border-0">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Continue Contributing</CardTitle>
            <CardDescription className="text-center">
              Help us gather more data and improve AI reliability understanding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary">
                <Link to="/test">
                  <Brain className="h-5 w-5 mr-2" />
                  Test More AI Responses
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/analytics">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  View Detailed Analytics
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Results;