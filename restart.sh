#!/bin/bash

# Kill all node processes
echo "Killing all Node.js processes..."
pkill -f node || echo "No Node.js processes found"

# Wait a moment
sleep 2

# Check if port 8080 is still in use
PORT_USED=$(lsof -i :8080 | grep LISTEN)
if [ -n "$PORT_USED" ]; then
  echo "Port 8080 is still in use, forcing kill..."
  lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9
  sleep 1
fi

# Set environment variables
export SMTP_USERNAME=emailapikey
export SMTP_PASSWORD="wSsVR60kqRamBvsvnWL7LudqzVgEAwv/RE1/3VuivnGpHfCQpsc4xUedA1XyGacdFmduFDtH9eh/kE8DhDMM244kzVkAXSiF9mqRe1U4J3x17qnvhDzDXWVdlRKKJYMJwwVsn2NpE8kh+g=="

# Start the server
echo "Starting server..."
npm run dev 