require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// API keys from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePriceId = process.env.STRIPE_PRICE_ID;
const domainUrl = process.env.DOMAIN_URL || "https://5dwaves.com";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const sendgridApiKey = process.env.SENDGRID_API_KEY;

// Initialize SendGrid
const sgMail = require('@sendgrid/mail');
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Initialize Stripe
const stripe = stripeSecretKey ? require('stripe')(stripeSecretKey) : null;

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/downloads', express.static('downloads'));
app.use(bodyParser.json());

// URL rewrites to match vercel.json
app.get('/terms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'terms.html'));
});

app.get('/tos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tos.html'));
});

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy.html'));
});

app.get('/support', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'support.html'));
});

// API endpoint to save leads
app.post('/api/save-lead', (req, res) => {
  try {
    const leadData = req.body;
    
    // Add timestamp if not provided
    if (!leadData.date) {
      leadData.date = new Date().toISOString();
    }
    
    // Validate the data
    if (!leadData.email || !leadData.name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }
    
    // Create leads directory if it doesn't exist
    const leadsDir = path.join(__dirname, 'leads');
    if (!fs.existsSync(leadsDir)) {
      fs.mkdirSync(leadsDir);
    }
    
    // Read existing leads file or create new one
    const leadsFile = path.join(leadsDir, 'leads.json');
    let leads = [];
    
    if (fs.existsSync(leadsFile)) {
      const leadsData = fs.readFileSync(leadsFile, 'utf8');
      leads = JSON.parse(leadsData);
    }
    
    // Add new lead
    leads.push(leadData);
    
    // Write updated leads back to file
    fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
    
    // Also append to CSV for easy import
    const csvFile = path.join(leadsDir, 'leads.csv');
    const csvExists = fs.existsSync(csvFile);
    
    const csvLine = `${leadData.name},${leadData.email},${leadData.source},${leadData.date}\n`;
    
    if (!csvExists) {
      // Add header row if file doesn't exist
      fs.writeFileSync(csvFile, 'Name,Email,Source,Date\n' + csvLine);
    } else {
      // Append to existing file
      fs.appendFileSync(csvFile, csvLine);
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ error: 'Failed to save lead data' });
  }
});

// Create Stripe Checkout session for free download
app.post('/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session...');
    
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe API key not configured' });
    }
    
    // Minimal checkout session for a free item (no payment required)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${domainUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/`,
      payment_intent_data: {
        setup_future_usage: null
      },
      submit_type: 'auto',
    });

    console.log(`Checkout session created: ${session.id}, URL: ${session.url}`);
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    if (error.type) {
      console.error('Stripe error type:', error.type);
    }
    console.error(error.stack);
    return res.status(500).json({ 
      error: error.message,
      type: error.type || 'unknown'
    });
  }
});

// Handle success page - verify session and provide download
app.get('/download-link/:sessionId', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe API key not configured' });
    }
    
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    
    // Verify the session was successful
    if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
      // Return the download URL - fix the path to match the actual file location
      res.json({ 
        downloadUrl: '/downloads/528%20Hz%20@5dwaves.mp3',
        customerEmail: session.customer_details.email 
      });
    } else {
      res.status(400).json({ error: 'Invalid session' });
    }
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook handler
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe API key not configured' });
  }
  
  const sig = req.headers['stripe-signature'];
  
  let event;

  try {
    // For testing without signature verification
    if (!stripeWebhookSecret) {
      event = req.body;
    } else {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details.email;
    const customerName = session.customer_details.name || 'Customer';
    
    console.log(`Checkout completed for ${customerEmail}`);
    
    // Log webhook event details for debugging
    console.log('Webhook event details:', JSON.stringify(session, null, 2));
    
    // Send download email
    try {
      if (sendgridApiKey) {
        const msg = {
          to: customerEmail,
          from: 'will@5dwaves.com', // Use your verified sender in SendGrid
          subject: 'Your 5D Waves Free Download',
          text: `Hello ${customerName},

Thank you for requesting the 5D Waves free download!

You can download your free audio here: https://5dwaves.com/downloads/528%20Hz%20@5dwaves.mp3

Save it to your device and listen at a comfortable volume whenever you need to clear your mind.

Gratitude,
Will @ 5D Waves`,
          html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <img src="https://5dwaves.com/images/logo.png" alt="5D Waves Logo" style="display: block; margin: 20px auto; width: 100px;">
  <h1 style="text-align: center; color: #333;">Your Download Is Ready</h1>
  <p>Hello ${customerName},</p>
  <p>Thank you for requesting the 5D Waves free download!</p>
  <p>You can download your free audio here:</p>
  <p style="text-align: center;">
    <a href="https://5dwaves.com/downloads/528%20Hz%20@5dwaves.mp3" style="background: linear-gradient(to right, #3b82f6, #2563eb); color: white; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: bold; display: inline-block;">Download Now</a>
  </p>
  <p>Save it to your device and listen at a comfortable volume whenever you need to clear your mind.</p>
  <p>Gratitude,<br>Will @ 5D Waves</p>
  <div style="margin-top: 30px; text-align: center; color: #666; font-size: 12px;">
    <p>Love this meditation track? Get even more with our mobile app!</p>
    <p>
      <a href="https://apps.apple.com/us/app/5d-waves/id6742191732" style="display: inline-block; margin: 0 10px; text-decoration: none; color: #3b82f6;">iOS App</a>
      <a href="https://play.google.com/store/apps/details?id=com.fivedwaves.organization" style="display: inline-block; margin: 0 10px; text-decoration: none; color: #3b82f6;">Android App</a>
    </p>
  </div>
</div>`
        };
        
        await sgMail.send(msg);
        console.log(`Email sent to ${customerEmail}`);
      } else {
        console.log(`SendGrid API key not set. Would send email to ${customerEmail} with download link`);
        
        // Temporary solution - log all the information needed to manually send an email
        console.log('======= MANUAL EMAIL DATA =======');
        console.log(`To: ${customerEmail}`);
        console.log(`Name: ${customerName}`);
        console.log(`Download Link: https://5dwaves.com/downloads/528%20Hz%20@5dwaves.mp3`);
        console.log('=================================');
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }
  }

  res.status(200).json({received: true});
});

// Catch-all handler for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Test URLs with rewrites:`);
  console.log(`  http://localhost:${port}/terms`);
  console.log(`  http://localhost:${port}/tos`);
  console.log(`  http://localhost:${port}/privacy`);
  console.log(`  http://localhost:${port}/support`);
}); 