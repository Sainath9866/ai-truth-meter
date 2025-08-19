import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Users, Brain, AlertTriangle, CheckCircle } from "lucide-react";

const Analytics = () => {
  // Sample data for demonstration
  const accuracyData = [
    { category: "Mathematics", accurate: 85, inaccurate: 15 },
    { category: "Science", accurate: 78, inaccurate: 22 },
    { category: "History", accurate: 72, inaccurate: 28 },
    { category: "Literature", accurate: 80, inaccurate: 20 },
    { category: "Geography", accurate: 88, inaccurate: 12 },
  ];

  const trendsData = [
    { month: "Jan", accuracy: 75 },
    { month: "Feb", accuracy: 78 },
    { month: "Mar", accuracy: 82 },
    { month: "Apr", accuracy: 79 },
    { month: "May", accuracy: 85 },
    { month: "Jun", accuracy: 88 },
  ];

  const errorTypes = [
    { name: "Factual Errors", value: 35, color: "#ef4444" },
    { name: "Missing Context", value: 28, color: "#f97316" },
    { name: "Misleading Info", value: 20, color: "#eab308" },
    { name: "Outdated Data", value: 17, color: "#06b6d4" },
  ];

  const responseTimeData = [
    { time: "0-2s", count: 45 },
    { time: "2-5s", count: 38 },
    { time: "5-10s", count: 12 },
    { time: "10s+", count: 5 },
  ];

  const stats = [
    {
      title: "Total Tests",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: Brain,
      color: "primary"
    },
    {
      title: "Average Accuracy",
      value: "82.4%",
      change: "+3.2%",
      trend: "up",
      icon: CheckCircle,
      color: "success"
    },
    {
      title: "Error Rate",
      value: "17.6%",
      change: "-2.1%",
      trend: "down",
      icon: AlertTriangle,
      color: "warning"
    },
    {
      title: "Active Testers",
      value: "1,234",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "primary"
    },
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
          Research Analytics
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of AI accuracy patterns and trends across educational content.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="shadow-custom-md hover:shadow-custom-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <TrendIcon className={`h-3 w-3 ${
                          stat.trend === "up" ? "text-success" : "text-destructive"
                        }`} />
                        <span className={`text-xs ${
                          stat.trend === "up" ? "text-success" : "text-destructive"
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg gradient-primary">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Accuracy by Category */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>Accuracy by Subject Category</CardTitle>
              <CardDescription>
                AI performance across different educational subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="accurate" fill="hsl(var(--primary))" name="Accurate" />
                  <Bar dataKey="inaccurate" fill="hsl(var(--destructive))" name="Inaccurate" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Types Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>Common Error Types</CardTitle>
              <CardDescription>
                Distribution of different types of inaccuracies found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={errorTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {errorTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accuracy Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Accuracy Trends Over Time</span>
                <Badge variant="outline" className="text-success border-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Improving
                </Badge>
              </CardTitle>
              <CardDescription>
                Monthly accuracy percentage trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Response Time Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="shadow-custom-md">
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>
                AI response generation speed analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    name="Number of Responses"
                  />
                </BarChart>
              </ResponsiveContainer>
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
        <Card className="shadow-custom-md">
          <CardHeader>
            <CardTitle>Key Research Insights</CardTitle>
            <CardDescription>
              Important findings from our AI accuracy analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <CheckCircle className="h-5 w-5 text-success mb-2" />
                <h4 className="font-semibold text-success">High STEM Accuracy</h4>
                <p className="text-sm text-muted-foreground">
                  Mathematics and sciences show 85%+ accuracy rates consistently
                </p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <AlertTriangle className="h-5 w-5 text-warning mb-2" />
                <h4 className="font-semibold text-warning">Context Challenges</h4>
                <p className="text-sm text-muted-foreground">
                  28% of errors involve missing contextual information
                </p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <TrendingUp className="h-5 w-5 text-primary mb-2" />
                <h4 className="font-semibold text-primary">Improving Trends</h4>
                <p className="text-sm text-muted-foreground">
                  Overall accuracy has improved 13% over the past 6 months
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;