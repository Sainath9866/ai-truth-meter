import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, Zap, Brain, Cpu, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  popularity: "high" | "medium" | "low";
}

const AI_MODELS: AIModel[] = [
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    description: "Latest Claude model with enhanced reasoning and accuracy",
    icon: <Brain className="h-5 w-5" />,
    color: "bg-orange-500",
    popularity: "high"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Multimodal model with advanced reasoning capabilities",
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-green-500",
    popularity: "high"
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Fast and efficient GPT-4 variant with large context",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-blue-500",
    popularity: "high"
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    description: "Lightning-fast Claude model for quick responses",
    icon: <Cpu className="h-5 w-5" />,
    color: "bg-purple-500",
    popularity: "medium"
  },
  {
    id: "gpt-3-5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    description: "Reliable and cost-effective model for general tasks",
    icon: <Bot className="h-5 w-5" />,
    color: "bg-indigo-500",
    popularity: "medium"
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    description: "Most capable Claude model for complex reasoning",
    icon: <Brain className="h-5 w-5" />,
    color: "bg-red-500",
    popularity: "low"
  }
];

interface ModelSelectorProps {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
}

const ModelSelector = ({ selectedModel, onModelSelect }: ModelSelectorProps) => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const getPopularityBadge = (popularity: string) => {
    switch (popularity) {
      case "high":
        return <Badge variant="default" className="bg-green-100 text-green-800">Popular</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Good</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Premium</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select AI Model</h3>
        <p className="text-sm text-gray-600">Choose which AI model generated the content you want to analyze</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AI_MODELS.map((model) => (
          <motion.div
            key={model.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredModel(model.id)}
            onHoverEnd={() => setHoveredModel(null)}
          >
            <Card 
              className={cn(
                "cursor-pointer transition-all duration-200 border-2",
                selectedModel === model.id 
                  ? "border-primary bg-primary/5 shadow-lg" 
                  : "border-gray-200 hover:border-gray-300 hover:shadow-md",
                hoveredModel === model.id && "shadow-lg"
              )}
              onClick={() => onModelSelect(model.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("p-2 rounded-lg text-white", model.color)}>
                    {model.icon}
                  </div>
                  {selectedModel === model.id && (
                    <div className="p-1 rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{model.name}</h4>
                    <p className="text-sm text-gray-600">{model.provider}</p>
                  </div>
                  
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {model.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    {getPopularityBadge(model.popularity)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
