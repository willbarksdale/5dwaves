// Serverless function for sending emails via ZeptoMail SMTP
// This will be deployed as a Vercel serverless function

// Required dependencies
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

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
    
    // Set up SMTP transport
    const transport = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 587,
      auth: {
        user: "emailapikey",
        pass: "wSsVR60kqRamBvsvnWL7LudqzVgEAwv/RE1/3VuivnGpHfCQpsc4xUedA1XyGacdFmduFDtH9eh/kE8DhDMM244kzVkAXSiF9mqRe1U4J3x17qnvhDzDXWVdlRKKJYMJwwVsn2NpE8kh+g=="
      }
    });
    
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
      `,
      attachments: [
        {
          filename: '528Hz.zip',
          path: path.join(process.cwd(), 'public', 'downloads', '528 Hz.zip')
        }
      ]
    };
    
    // In development mode without actual file, simulate success
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Simulating email send success');
      return res.status(200).json({ 
        success: true, 
        message: 'File would be sent to ' + email + ' (simulated)' 
      });
    }
    
    // Send the email
    const info = await transport.sendMail(mailOptions);
    
    console.log('Email sent: %s', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'File sent successfully to ' + email 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
} 