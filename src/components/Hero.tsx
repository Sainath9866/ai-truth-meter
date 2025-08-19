import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowRight, Target, Users, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const features = [
    { icon: Target, title: "Accuracy Testing", description: "Test AI responses against verified educational content" },
    { icon: Users, title: "Student-Centered", description: "Designed specifically for educational research" },
    { icon: BarChart3, title: "Data Analytics", description: "Comprehensive analysis of AI reliability patterns" },
    { icon: CheckCircle, title: "Evidence-Based", description: "Rigorous methodology for measuring AI accuracy" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-subtle opacity-50" />
      
      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              🔬 Academic Research Tool
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Detecting Inaccuracies in{" "}
              <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                AI-Generated
              </span>{" "}
              Educational Content
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive study measuring the reliability of AI responses for students. 
              Test, analyze, and understand AI accuracy in educational contexts.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="gradient-primary border-0 shadow-custom-lg group">
              <Link to="/test" className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Start Testing AI</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/20">
              <Link to="/study">Learn About The Study</Link>
            </Button>
          </motion.div>

          {/* Research highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="p-6 gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-smooth">
                      <div className="text-center space-y-3">
                        <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mx-auto">
                          <Icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;