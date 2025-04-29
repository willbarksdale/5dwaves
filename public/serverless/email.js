// Serverless function for sending emails via Zoho Mail
// This would be deployed as a Vercel serverless function

// Required environment variables:
// - ZOHO_MAIL_API_TOKEN: Your Zoho Mail API token

// Import necessary modules
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Get the request body
    const { email } = req.body;
    
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    // Zoho Mail API URL 
    const apiUrl = 'https://mail.zoho.com/api/accounts/1/messages';
    
    // Zoho Mail API token from environment variables
    const apiToken = process.env.ZOHO_MAIL_API_TOKEN;
    
    if (!apiToken) {
      return res.status(500).json({ error: 'API token is not configured' });
    }
    
    // Download URL (replace with your actual file URL)
    const downloadUrl = `https://5dwaves.com/downloads/528%20Hz%20@5dwaves.mp3`;
    
    // Email content with the download link
    const emailContent = {
      fromAddress: 'will@5dwaves.com',
      toAddress: email,
      subject: 'Your 528 Hz Frequency Download from 5D Waves',
      content: `
        <p>Hello,</p>

        <p>Thank you for your purchase! Here is your 528 Hz frequency download link:</p>

        <p><a href="${downloadUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">Download Your 528 Hz Frequency</a></p>

        <p>This link will allow you to download the file directly. If the button doesn't work, you can copy and paste this URL into your browser:</p>
        <p>${downloadUrl}</p>

        <p>Enjoy your meditation experience!</p>

        <p>Best regards,<br>
        5D Waves Team</p>
      `,
      mailFormat: 'html'
    };
    
    // Send the email using Zoho Mail API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Zoho-oauthtoken ${apiToken}`
      },
      body: JSON.stringify(emailContent)
    });
    
    // Parse the response
    const data = await response.json();
    
    // Check if the email was sent successfully
    if (response.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Download link sent successfully to ' + email 
      });
    } else {
      console.error('Zoho Mail API error:', data);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: data 
      });
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}; 