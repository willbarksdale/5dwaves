// Serverless function for sending emails via ZeptoMail SMTP
// This will be deployed as a Vercel serverless function

// Required dependencies
import nodemailer from 'nodemailer';
import https from 'https';
import { Readable } from 'stream';

export default async function handler(req, res) {
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
    
    console.log('Setting up SMTP transport with ZeptoMail');
    
    // Set up SMTP transport with ZeptoMail
    const transport = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 587,
      auth: {
        user: "emailapikey",
        pass: "wSsVR60kqRamBvsvnWL7LudqzVgEAwv/RE1/3VuivnGpHfCQpsc4xUedA1XyGacdFmduFDtH9eh/kE8DhDMM244kzVkAXSiF9mqRe1U4J3x17qnvhDzDXWVdlRKKJYMJwwVsn2NpE8kh+g=="
      }
    });
    
    // The URL of the zip file
    const fileUrl = 'https://5dwaves.com/downloads/528%20Hz.zip';
    
    console.log('Fetching zip file from:', fileUrl);
    
    // Fetch the zip file and send it as an attachment
    https.get(fileUrl, async (fileResponse) => {
      if (fileResponse.statusCode !== 200) {
        console.error('Failed to fetch zip file:', fileResponse.statusCode);
        return res.status(500).json({ error: 'Failed to fetch attachment file' });
      }
      
      // Configure email options
      const mailOptions = {
        from: '"5D Waves" <will@5dwaves.com>',
        to: email,
        subject: "Your Free Download From 5D Waves",
        html: `
          <p>Hello,</p>

          <p>Your free download is attached to this email.</p>
          
          <p>Save to your device & listen at a comfortable volume as needed to clear your mind!</p>

          <p>Gratitude,<br>
          Will @ 5D Waves</p>
          
          <p>If the attachment doesn't come through, you can also download directly from <a href="${fileUrl}">this link</a>.</p>
        `,
        attachments: [
          {
            filename: '528Hz.zip',
            content: fileResponse
          }
        ]
      };
      
      console.log('Sending email to:', email);
      
      try {
        // Send the email
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        
        return res.status(200).json({ 
          success: true, 
          message: 'File sent successfully to ' + email 
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        return res.status(500).json({ 
          error: 'Error sending email', 
          details: emailError.message 
        });
      }
    }).on('error', (err) => {
      console.error('Error fetching attachment:', err);
      return res.status(500).json({ error: 'Error fetching attachment', details: err.message });
    });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 