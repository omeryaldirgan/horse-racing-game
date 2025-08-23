#!/bin/bash
echo "🚀 Starting Horse Racing Game..."
echo "📁 Project Directory: $(pwd)"
echo "📦 Dependencies: $(ls node_modules | wc -l | tr -d ' ') packages installed"
echo ""
echo "🌐 Starting development server..."
echo "📱 Open your browser to: http://localhost:8080"
echo "⏹️  Press Ctrl+C to stop the server"
echo ""
npm run serve
