// Quick test script to verify Gemini API connection
const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyCiRNezOcafkAjeZKVDD3-6UrdAKiRz1WA';

async function testGeminiAPI() {
    console.log('🧪 Testing Gemini API connection...');
    
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: "Explain photosynthesis in 2 simple steps for a student."
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 10000
            }
        );

        const generatedText = response.data.candidates[0].content.parts[0].text;
        console.log('✅ API connection successful!');
        console.log('📝 Sample response:', generatedText);
        console.log('\n🚀 Your Learning Agent is ready to use!');
        
    } catch (error) {
        console.error('❌ API test failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Error:', error.response.data?.error?.message || 'Unknown API error');
        } else {
            console.error('Error:', error.message);
        }
    }
}

testGeminiAPI();
