import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Search, Brain, BarChart3, Sparkles } from "lucide-react";

interface ProgressPopupProps {
  isOpen: boolean;
  currentStep: number;
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Testing Content",
    description: "Analyzing the structure and format",
    icon: Search,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Judging Accuracy",
    description: "Evaluating factual correctness",
    icon: Brain,
    color: "text-purple-600"
  },
  {
    id: 3,
    title: "Generating Metrics",
    description: "Calculating detailed scores",
    icon: BarChart3,
    color: "text-green-600"
  },
  {
    id: 4,
    title: "Finalizing Results",
    description: "Preparing comprehensive analysis",
    icon: Sparkles,
    color: "text-orange-600"
  }
];

export const ProgressPopup = ({ isOpen, currentStep, onComplete }: ProgressPopupProps) => {
  const progress = (currentStep / steps.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle className="sr-only">Analysis Progress</DialogTitle>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4"
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Analyzing AI Content
                </h2>
                <p className="text-gray-600">
                  Please wait while we analyze the content for accuracy...
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50 border border-blue-200"
                          : isCompleted
                          ? "bg-green-50 border border-green-200"
                          : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : step.color}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`font-medium transition-colors duration-300 ${
                            isActive ? "text-blue-900" : isCompleted ? "text-green-900" : "text-gray-700"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-sm transition-colors duration-300 ${
                            isActive ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-500"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {currentStep === steps.length && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3"
                  >
                    <CheckCircle className="w-6 h-6 text-white" />
                  </motion.div>
                  <p className="text-green-600 font-medium">Analysis Complete!</p>
                </motion.div>
              )}
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
