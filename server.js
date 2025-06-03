const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for frontend communication

// Get Gemini API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Check if API key is configured
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.error('❌ GEMINI_API_KEY not configured!');
    console.log('📝 Please follow these steps:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Edit .env and add your Gemini API key');
    console.log('   3. Get your API key from: https://ai.google.dev');
    console.log('   4. Restart the server');
    process.exit(1);
}

// Serve static files (for serving index.html)
app.use(express.static('.'));

// Health check endpoint
app.get('/', (req, res) => {
    res.send(`
        <h1>Learning Agent API Server</h1>
        <p>Server is running on port ${PORT}</p>
        <p>Frontend available at: <a href="/index.html">index.html</a></p>
        <p>API endpoint: POST /ask</p>
        <br>
        <p><strong>Setup Instructions:</strong></p>
        <ol>
            <li>Get your Gemini API key from <a href="https://ai.google.dev" target="_blank">https://ai.google.dev</a></li>
            <li>Replace 'YOUR_GEMINI_API_KEY' in server.js with your actual API key</li>
            <li>Restart the server</li>
        </ol>
    `);
});

// Main API endpoint to handle questions
app.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;

        // Validate input
        if (!question || question.trim() === '') {
            return res.status(400).json({ error: 'Question is required' });
        }

        // Check if API key is configured
        if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
            return res.status(500).json({ 
                error: 'Gemini API key not configured. Please add your API key to server.js' 
            });
        }

        console.log(`Received question: ${question}`);

        // Prepare the prompt for step-by-step explanation
        const prompt = `Explain "${question}" in a clear, step-by-step manner for a student. 
        Break down the explanation into numbered steps. Each step should be a complete sentence or two.
        Make it educational and easy to understand. Format each step on a new line starting with "Step X:".`;

        // Make API call to Gemini
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30 second timeout
            }
        );

        // Extract the generated text from Gemini response
        const generatedText = response.data.candidates[0].content.parts[0].text;
        console.log('Gemini response:', generatedText);

        // Process the response into steps
        const steps = processGeminiResponse(generatedText);

        // Return the steps
        res.json({ steps });

    } catch (error) {
        console.error('Error processing request:', error.message);
        
        // Handle specific error types
        if (error.response) {
            // API error
            const status = error.response.status;
            const message = error.response.data?.error?.message || 'API request failed';
            
            if (status === 401) {
                return res.status(500).json({ 
                    error: 'Invalid API key. Please check your Gemini API key in server.js' 
                });
            } else if (status === 429) {
                return res.status(500).json({ 
                    error: 'API rate limit exceeded. Please try again later.' 
                });
            } else {
                return res.status(500).json({ 
                    error: `Gemini API error: ${message}` 
                });
            }
        } else if (error.code === 'ECONNABORTED') {
            return res.status(500).json({ 
                error: 'Request timeout. The API took too long to respond.' 
            });
        } else {
            return res.status(500).json({ 
                error: 'Failed to get answer from AI service' 
            });
        }
    }
});

// Function to process Gemini response into steps array
function processGeminiResponse(text) {
    try {
        // Split by lines and filter out empty lines
        let lines = text.split('\n').filter(line => line.trim() !== '');
        
        // Extract steps - look for lines that contain step information
        let steps = [];
        
        for (let line of lines) {
            const trimmedLine = line.trim();
            
            // Skip empty lines and markdown formatting
            if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine === '---') {
                continue;
            }
            
            // Remove "Step X:" prefix if it exists, since we'll add our own
            let cleanLine = trimmedLine.replace(/^Step\s+\d+:\s*/i, '');
            
            // Remove bullet points and numbering
            cleanLine = cleanLine.replace(/^\d+\.\s*/, '');
            cleanLine = cleanLine.replace(/^[-*•]\s*/, '');
            
            // Remove markdown formatting
            cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove bold
            cleanLine = cleanLine.replace(/\*(.*?)\*/g, '$1'); // Remove italic
            
            if (cleanLine.length > 10) { // Only include meaningful content
                steps.push(cleanLine);
            }
        }
        
        // If no steps found or too few, treat the whole response as steps
        if (steps.length === 0) {
            // Split by sentences instead
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
            steps = sentences.slice(0, 8); // Limit to reasonable number of steps
        }
        
        // Ensure we have at least one step
        if (steps.length === 0) {
            steps = [text.trim() || 'No clear answer could be generated for this question.'];
        }
        
        // Limit to maximum 10 steps for better UX
        if (steps.length > 10) {
            steps = steps.slice(0, 10);
        }
        
        console.log(`Processed ${steps.length} steps:`, steps);
        return steps;
        
    } catch (error) {
        console.error('Error processing Gemini response:', error);
        return ['Error processing the AI response. Please try again.'];
    }
}

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Learning Agent server running on http://localhost:${PORT}`);
    console.log(`📝 Frontend available at: http://localhost:${PORT}/index.html`);
    console.log(`🔐 API key loaded securely from environment variables`);
    console.log(`✅ Ready to answer questions!`);
});
