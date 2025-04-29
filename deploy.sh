#!/bin/bash

# Make sure environment variables are set for Vercel
if [ -z "$SMTP_USERNAME" ] || [ -z "$SMTP_PASSWORD" ]; then
  echo "Warning: SMTP environment variables not set locally."
  echo "Make sure they are set in your Vercel project settings."
fi

# Kill any running server
pkill -f node || echo "No Node.js processes found"

# Add all changes
git add .

# Commit changes
echo "Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Push to GitHub (which will trigger Vercel deployment if connected)
git push

# Optional: Direct Vercel deployment if using Vercel CLI
if command -v vercel &> /dev/null; then
  echo "Deploying directly to Vercel..."
  vercel --prod
else
  echo "Vercel CLI not found. If your GitHub repository is connected to Vercel,"
  echo "the push should trigger a deployment automatically."
fi

echo "Deployment process complete!" 