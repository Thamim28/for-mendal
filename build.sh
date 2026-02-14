#!/bin/sh
set -e
echo "🔨 Starting build..."
echo "📦 Installing dependencies..."
npm ci
echo "🏗️  Building project..."
node ./node_modules/vite/bin/vite.js build
echo "✅ Build complete!"
