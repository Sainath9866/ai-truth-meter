# AI Truth Meter

A comprehensive React application for analyzing AI-generated content accuracy with detailed metrics, model comparisons, and cost-optimized API usage.

## 🚀 Features

### Core Functionality
- **Model Selection**: Choose from 6 popular AI models (Claude 3.5 Sonnet, GPT-4o, GPT-4, Gemini 1.5 Pro, Mistral Large, LLaMA 3 70B)
- **Content Analysis**: Paste AI-generated content and get automated accuracy analysis
- **4-Stage Progress**: Animated progress popup with testing, judging, generating metrics, and finalizing stages
- **Detailed Metrics**: 4 unique accuracy metrics (Factual Correctness, Logical Consistency, Clarity, Depth)
- **Cost Optimization**: API calls optimized to ~$0.01 per request with content truncation

### Analytics & Tracking
- **Local Storage**: All analysis results stored locally for persistence
- **Model Comparison**: Compare accuracy scores across different AI models
- **Trend Analysis**: Track accuracy trends over the last 7 days
- **Error Classification**: Categorize and visualize common error types
- **Cost Tracking**: Monitor total API costs and usage

### UI/UX
- **Modern Design**: Clean, attractive interface with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout the app
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Progress Indicators**: Visual feedback during analysis process

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Claude API key from Anthropic

### API Key Setup
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and generate an API key
3. Copy the API key (starts with `sk-ant-...`)
4. Create a `.env` file in your project root
5. Add: `CLAUDE_API_KEY=your_actual_api_key_here`

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-truth-meter
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install backend server dependencies**
   ```bash
   npm install express cors node-fetch dotenv
   # or
   yarn add express cors node-fetch dotenv
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   CLAUDE_API_KEY=your_claude_api_key_here
   ```
   
   **Note**: For the backend server, use `CLAUDE_API_KEY` (without VITE_ prefix).

4. **Get Claude API Key**
   - Visit [Anthropic Console](https://console.anthropic.com/)
   - Create an account and generate an API key
   - Add the key to your `.env` file

5. **Start the backend server**
   ```bash
   node server.js
   # or
   npm run dev
   ```
   The server will run on `http://localhost:3001`

6. **Start the frontend development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Testing AI Content
1. **Select Model**: Choose the AI model that generated your content
2. **Paste Content**: Input the AI-generated text you want to analyze
3. **Analyze**: Click "Analyze Content Accuracy" to start the process
4. **View Results**: See detailed accuracy metrics, issues, and strengths

### Analytics Dashboard
1. **Navigate to Analytics**: Click the Analytics tab in the navigation
2. **View Statistics**: See total tests, average accuracy, costs, and model counts
3. **Compare Models**: Use charts to compare performance across different AI models
4. **Track Trends**: Monitor accuracy trends over time
5. **Manage Data**: Clear history or refresh data as needed

## 🏗️ Architecture

### Components
- **Test Page**: Main analysis interface with model selection and content input
- **Analytics Page**: Dashboard with charts and model comparisons
- **ProgressPopup**: Animated progress indicator during analysis
- **AnalysisResults**: Detailed results display with metrics and insights

### API Integration
- **Claude API**: Direct integration with Anthropic's Claude 3.5 Sonnet
- **Cost Optimization**: Content truncation and token limits to control costs
- **Error Handling**: Comprehensive error handling and user feedback

### Data Management
- **Local Storage**: Persistent storage of analysis history
- **Real-time Analytics**: Dynamic calculation of statistics and trends
- **Model Tracking**: Individual model performance monitoring

## 💰 Cost Management

The application is optimized for minimal API costs:
- **Content Truncation**: Automatically limits input to ~500 tokens
- **Output Limits**: Restricts Claude responses to 1000 tokens
- **Estimated Cost**: ~$0.01 per analysis request
- **Cost Tracking**: Monitor total spending in the analytics dashboard

## 🎨 Design System

### Colors
- Primary: Blue gradient for main actions
- Success: Green for positive metrics
- Warning: Orange for moderate scores
- Error: Red for low accuracy or issues

### Typography
- Headings: Bold, gradient text for impact
- Body: Clean, readable fonts with proper hierarchy
- Labels: Clear, descriptive text for all inputs

### Animations
- Page transitions: Smooth fade and slide effects
- Progress indicators: Animated step-by-step progress
- Results reveal: Staggered animations for metrics
- Hover effects: Subtle interactions for better UX

## 🔧 Customization

### Adding New Models
Edit `src/pages/Test.tsx` to add new AI models:
```typescript
const AI_MODELS = [
  // Add new models here
  { id: "new-model", name: "New Model", description: "Model description" }
];
```

### Modifying Metrics
Update the analysis prompt in `src/lib/claude-api.ts` to change the evaluation criteria.

### Styling Changes
Modify Tailwind classes throughout the components or update the design system in `tailwind.config.ts`.

## 🚨 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure your Claude API key is correctly set in the `.env` file
   - Verify the key has sufficient credits
   - **Important**: The environment variable must be named `CLAUDE_API_KEY` (for the backend server)

2. **Analysis Fails**
   - Check your internet connection
   - Verify the content isn't too long (will be auto-truncated)
   - Ensure the selected model is valid
   - Verify your Claude API key is valid and has sufficient credits

3. **CORS/API Errors**
   - The app uses a local backend server to proxy Claude API calls
   - Ensure the backend server is running on port 3001
   - No CORS issues when using the local proxy server

4. **No Analytics Data**
   - Run some tests first to generate data
   - Check if localStorage is enabled in your browser

### Support
For issues or questions, please check the console for error messages and ensure all dependencies are properly installed.

## 📊 Performance

- **Fast Loading**: Optimized bundle size with code splitting
- **Responsive**: Works on all device sizes
- **Efficient**: Minimal API calls with smart caching
- **Accessible**: WCAG compliant design patterns

## 🔮 Future Enhancements

- **Export Data**: CSV/JSON export of analysis results
- **Batch Analysis**: Analyze multiple content pieces at once
- **Custom Metrics**: User-defined evaluation criteria
- **API Integration**: Support for additional AI model APIs
- **Collaboration**: Share analysis results with team members

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Framer Motion.