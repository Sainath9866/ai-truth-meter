import { motion } from "framer-motion";
import { Brain, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="md:col-span-2 space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <div className="rounded-lg gradient-primary p-2">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                AI Truth Meter
              </span>
            </motion.div>
            <p className="text-muted-foreground max-w-md">
              A research tool for detecting inaccuracies in AI-generated educational content. 
              Helping students and educators understand AI reliability in learning contexts.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="border-primary/20">
                <Github className="h-4 w-4 mr-2" />
                View Research
              </Button>
              <Button variant="outline" size="sm" className="border-primary/20">
                <ExternalLink className="h-4 w-4 mr-2" />
                Documentation
              </Button>
            </div>
          </div>

          {/* Research section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Research</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/study" className="hover:text-primary transition-colors">
                  Study Overview
                </Link>
              </li>
              <li>
                <Link to="/test" className="hover:text-primary transition-colors">
                  Testing Methodology
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-primary transition-colors">
                  Data Analysis
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-primary transition-colors">
                  Research Findings
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/test" className="hover:text-primary transition-colors">
                  AI Testing Interface
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-primary transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-primary transition-colors">
                  Results Viewer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AI Truth Meter Research Project. Educational use only.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;