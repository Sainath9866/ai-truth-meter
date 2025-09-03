import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Users, Brain, AlertTriangle, CheckCircle, Trash2, RefreshCw } from "lucide-react";
import { getAnalysisHistory, clearAnalysisHistory, AnalysisHistory } from "@/lib/claude-api";
import { useState, useEffect } from "react";

const Analytics = () => {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const analysisHistory = getAnalysisHistory();
    setHistory(analysisHistory);
    setLoading(false);
  };

  const handleClearHistory = () => {
    clearAnalysisHistory();
    setHistory([]);
  };

  // Process real data from localStorage
  const processAnalyticsData = () => {
    if (history.length === 0) {
      return {
        modelStats: [],
        accuracyData: [],
        trendsData: [],
        errorTypes: [],
        stats: [
          {
            title: "Total Tests",
            value: "0",
            change: "0%",
            trend: "up",
            icon: Brain,
            color: "primary"
          },
          {
            title: "Average Accuracy",
            value: "0%",
            change: "0%",
            trend: "up",
            icon: CheckCircle,
            color: "success"
          },
          {
            title: "Total Cost",
            value: "$0.00",
            change: "0%",
            trend: "up",
            icon: AlertTriangle,
            color: "warning"
          },
          {
            title: "Models Tested",
            value: "0",
            change: "0%",
            trend: "up",
            icon: Users,
            color: "primary"
          },
        ]
      };
    }

    // Calculate model statistics
    const modelStats = history.reduce((acc, analysis) => {
      const model = analysis.model;
      if (!acc[model]) {
        acc[model] = {
          model,
          count: 0,
          totalAccuracy: 0,
          accuracies: []
        };
      }
      acc[model].count++;
      acc[model].totalAccuracy += analysis.result.overallAccuracy;
      acc[model].accuracies.push(analysis.result.overallAccuracy);
      return acc;
    }, {} as Record<string, any>);

    const modelStatsArray = Object.values(modelStats).map((stat: any) => ({
      model: stat.model,
      count: stat.count,
      averageAccuracy: Math.round(stat.totalAccuracy / stat.count),
      accuracies: stat.accuracies
    }));

    // Calculate overall statistics
    const totalTests = history.length;
    const averageAccuracy = Math.round(history.reduce((sum, h) => sum + h.result.overallAccuracy, 0) / totalTests);
    const uniqueModels = new Set(history.map(h => h.model)).size;

    // Create trends data (last 7 days)
    const trendsData = [];
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    last7Days.forEach(date => {
      const dayAnalyses = history.filter(h => 
        new Date(h.timestamp).toISOString().split('T')[0] === date
      );
      const dayAccuracy = dayAnalyses.length > 0 
        ? Math.round(dayAnalyses.reduce((sum, h) => sum + h.result.overallAccuracy, 0) / dayAnalyses.length)
        : 0;
      
      trendsData.push({
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        accuracy: dayAccuracy,
        count: dayAnalyses.length
      });
    });

    // Calculate error types from whatWentWrong
    const errorCounts: Record<string, number> = {};
    history.forEach(analysis => {
      analysis.result.whatWentWrong.forEach(error => {
        const errorType = error.toLowerCase();
        if (errorType.includes('factual') || errorType.includes('fact')) {
          errorCounts['Factual Errors'] = (errorCounts['Factual Errors'] || 0) + 1;
        } else if (errorType.includes('context') || errorType.includes('missing')) {
          errorCounts['Missing Context'] = (errorCounts['Missing Context'] || 0) + 1;
        } else if (errorType.includes('misleading') || errorType.includes('confusing')) {
          errorCounts['Misleading Info'] = (errorCounts['Misleading Info'] || 0) + 1;
        } else if (errorType.includes('outdated') || errorType.includes('old')) {
          errorCounts['Outdated Data'] = (errorCounts['Outdated Data'] || 0) + 1;
        } else {
          errorCounts['Other Issues'] = (errorCounts['Other Issues'] || 0) + 1;
        }
      });
    });

    const errorTypes = Object.entries(errorCounts).map(([name, value], index) => ({
      name,
      value,
      color: ["#ef4444", "#f97316", "#eab308", "#06b6d4", "#8b5cf6"][index % 5]
    }));

    return {
      modelStats: modelStatsArray,
      accuracyData: modelStatsArray.map(stat => ({
        model: stat.model.split('-')[0], // Shorten model names
        accuracy: stat.averageAccuracy,
        count: stat.count
      })),
      trendsData,
      errorTypes,
      stats: [
        {
          title: "Total Tests",
          value: totalTests.toString(),
          change: "+0%",
          trend: "up",
          icon: Brain,
          color: "primary"
        },
        {
          title: "Average Accuracy",
          value: `${averageAccuracy}%`,
          change: "+0%",
          trend: "up",
          icon: CheckCircle,
          color: "success"
        },
        {
          title: "Models Tested",
          value: uniqueModels.toString(),
          change: "+0%",
          trend: "up",
          icon: Users,
          color: "primary"
        },
      ]
    };
  };

  const analyticsData = processAnalyticsData();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          AI Truth Meter Analytics
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of AI model accuracy patterns and trends from your testing history.
        </p>
        
        {history.length > 0 && (
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={loadHistory}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
            <Button
              onClick={handleClearHistory}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear History
            </Button>
          </div>
        )}
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <Brain className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No Analysis Data Yet</h3>
              <p className="text-gray-600 mb-4">
                Start testing AI models to see detailed analytics and comparisons.
              </p>
              <Button asChild>
                <a href="/test">Start Testing</a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsData.stats.map((stat, index) => {
              const Icon = stat.icon;
              const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
              
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <TrendIcon className={`h-3 w-3 ${
                              stat.trend === "up" ? "text-green-600" : "text-red-600"
                            }`} />
                            <span className={`text-xs ${
                              stat.trend === "up" ? "text-green-600" : "text-red-600"
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Model Comparison */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Model Accuracy Comparison</CardTitle>
                  <CardDescription>
                    Average accuracy scores by AI model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData.accuracyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.accuracyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="model" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value, name) => [`${value}%`, 'Accuracy']}
                          labelFormatter={(label) => `Model: ${label}`}
                        />
                        <Bar dataKey="accuracy" fill="hsl(var(--primary))" name="Accuracy" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No model data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Error Types Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Common Error Types</CardTitle>
                  <CardDescription>
                    Distribution of different types of inaccuracies found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData.errorTypes.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analyticsData.errorTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {analyticsData.errorTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No error data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Accuracy Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Accuracy Trends (Last 7 Days)</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Tracking
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Daily accuracy percentage trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData.trendsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={analyticsData.trendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip 
                          formatter={(value, name) => [`${value}%`, 'Accuracy']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="accuracy" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary) / 0.2)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No trend data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Model Performance Table */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Model Performance Summary</CardTitle>
                  <CardDescription>
                    Detailed performance metrics for each tested model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData.modelStats.length > 0 ? (
                    <div className="space-y-4">
                      {analyticsData.modelStats.map((stat, index) => (
                        <motion.div
                          key={stat.model}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Brain className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{stat.model}</h4>
                              <p className="text-sm text-gray-600">{stat.count} tests</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {stat.averageAccuracy}%
                            </div>
                            <div className="text-sm text-gray-600">
                              Avg Accuracy
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No model performance data available
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Research Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Key Insights from Your Analysis</CardTitle>
                <CardDescription>
                  Important findings from your AI accuracy testing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-800">Testing Activity</h4>
                    <p className="text-sm text-green-700">
                      You've tested {history.length} AI-generated content pieces across {new Set(history.map(h => h.model)).size} different models
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <Brain className="h-5 w-5 text-blue-600 mb-2" />
                    <h4 className="font-semibold text-blue-800">Analysis Quality</h4>
                    <p className="text-sm text-blue-700">
                      Comprehensive accuracy analysis with detailed metrics and insights
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <TrendingUp className="h-5 w-5 text-purple-600 mb-2" />
                    <h4 className="font-semibold text-purple-800">Model Comparison</h4>
                    <p className="text-sm text-purple-700">
                      Compare accuracy scores to identify the most reliable AI models for your use case
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Analytics;