# 🤖 Learning Agent - Step-by-Step Learning Assistant

A web-based learning agent that helps students understand topics through step-by-step explanations powered by Google's Gemini AI.

## ✨ Features

- **Interactive Web Interface**: Clean and user-friendly design
- **Step-by-Step Learning**: Breaks down complex topics into digestible steps
- **Animated Display**: Text appears word-by-word with smooth animations
- **AI-Powered**: Uses Google's Gemini API for intelligent explanations
- **Auto-Scrolling**: Canvas automatically scrolls as content is added
- **Error Handling**: Robust error handling for better user experience

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- A Google Gemini API key (free at [ai.google.dev](https://ai.google.dev))

### Setup Instructions

1. **Clone or Download the Project**
   ```bash
   git clone <your-repo-url>
   cd learning-agent
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Get your Gemini API Key**
   - Visit [https://ai.google.dev](https://ai.google.dev)
   - Sign up/login with your Google account
   - Create a new API key
   - Copy the API key for the next step

4. **Configure Environment Variables**
   - Copy the environment template:
     ```cmd
     copy .env.example .env
     ```
   - Open `.env` file and replace `your_gemini_api_key_here` with your actual API key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```

5. **Start the Server**
   ```bash
   npm start
   ```
   Or:
   ```bash
   node server.js
   ```

6. **Open the Application**
   - Open your web browser
   - Go to `http://localhost:3000/index.html`
   - Start asking questions!

## 🎯 Usage

1. **Ask a Question**: Type any educational question in the input field
   - Example: "How does photosynthesis work?"
   - Example: "Explain the water cycle"
   - Example: "What is gravity?"

2. **Watch the Magic**: The AI will break down the answer into steps and display them with smooth animations:
   - Each step appears one at a time
   - Within each step, words appear with a typing effect
   - The canvas auto-scrolls to keep new content visible

3. **Learn Effectively**: The step-by-step format makes complex topics easier to understand

## 📁 Project Structure

```
Levin/
├── index.html          # Frontend web interface
├── server.js           # Backend Node.js server
├── package.json        # Project dependencies
├── package-lock.json   # Dependency lock file
├── .env               # Environment variables (not in git)
├── .env.example        # Environment template
├── .gitignore         # Git ignore file
├── diagnostic.html     # Connection diagnostic tool
├── test.html          # Simple connection test
├── start-server.bat    # Windows server startup script
└── README.md          # This file
```

## 🛠 Technical Details

### Frontend (`index.html`)
- **HTML**: Clean structure with input field and canvas area
- **CSS**: Responsive design with smooth animations
- **JavaScript**: Handles user interactions and API communication

### Backend (`server.js`)
- **Express.js**: Web server framework
- **Axios**: HTTP client for API requests
- **CORS**: Cross-origin resource sharing support
- **Gemini Integration**: Connects to Google's AI API
- **Environment Variables**: Secure API key management with dotenv

### Animation System
- **Step-by-Step**: 2-second delay between steps
- **Word-by-Word**: 100ms delay between words
- **Auto-Scroll**: Canvas scrolls automatically as content appears

## 🎨 Customization

### Modify Animation Speed
In `index.html`, adjust these values:
```javascript
// Delay between steps (currently 2000ms = 2 seconds)
await new Promise(resolve => setTimeout(resolve, 2000));

// Delay between words (currently 100ms)
await new Promise(resolve => setTimeout(resolve, 100));
```

### Change Styling
Edit the `<style>` section in `index.html` to customize:
- Colors
- Fonts
- Layout
- Canvas size

### Modify AI Prompts
In `server.js`, edit the `prompt` variable to change how the AI formats responses:
```javascript
const prompt = `Explain "${question}" in a clear, step-by-step manner...`;
```

## 🔧 Troubleshooting

### Common Issues

1. **"GEMINI_API_KEY not configured" error**
   - Make sure you created the `.env` file from `.env.example`
   - Verify your API key is correct in the `.env` file
   - Restart the server after making changes

2. **CORS errors**
   - Make sure you're accessing via `http://localhost:3000/index.html`
   - Don't open `index.html` directly in the browser

3. **Server won't start**
   - Check if port 3000 is already in use
   - Run `npm install` to ensure dependencies are installed
   - Make sure the `.env` file exists with your API key

4. **No response from AI**
   - Verify your API key is valid in the `.env` file
   - Check your internet connection
   - Look at the server console for error messages

### Debug Mode
Check the browser console (F12) and server terminal for detailed error messages.

## 📚 Example Questions to Try

- "How does photosynthesis work?"
- "Explain the water cycle"
- "What causes earthquakes?"
- "How do computers work?"
- "Explain photosynthesis to a 10-year-old"
- "What is machine learning?"

## 🔐 Security Notes

- **API Key Security**: API keys are stored in environment variables, not in source code
- **Environment Files**: The `.env` file is excluded from version control via `.gitignore`
- **Best Practices**: Never commit API keys or sensitive data to repositories
- **Production**: Use environment variables or secure secret management in production

## 🚀 Deployment

### GitHub Setup
1. **Before pushing to GitHub**, ensure `.env` is in your `.gitignore`
2. **Use environment variables** in production deployments
3. **Share `.env.example`** for other developers to configure their own API keys

### Environment Variables for Deployment
- `GEMINI_API_KEY`: Your Gemini API key
- `PORT`: Server port (default: 3000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Create your own `.env` file with your API key
5. Test your changes
6. Commit your changes: `git commit -am 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

**Note**: Never commit your `.env` file or any API keys to the repository!

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Learning! 🎓**