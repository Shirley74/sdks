#!/bin/bash

# Local script to test publishing without actually publishing
# Usage: ./scripts/test-publish-local.sh <sdk-name>

SDK=$1

if [ -z "$SDK" ]; then
  echo "Usage: $0 <sdk-name>"
  echo "Available SDKs: aqua, cross-chain, fusion, limit-order"
  exit 1
fi

echo "🧪 Testing publish workflow for @1inch/$SDK-sdk"
echo "================================================"

# Check if SDK exists
if [ ! -d "typescript/$SDK" ]; then
  echo "❌ SDK not found: typescript/$SDK"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build the SDK
echo "🔨 Building SDK..."
pnpm nx build $SDK

# Check build output
echo "✅ Build complete. Checking output..."
ls -la typescript/$SDK/dist/

# Create a tarball (what npm publish would do)
echo "📦 Creating package tarball..."
cd typescript/$SDK
npm pack dist --dry-run

# Verify package contents
echo "📋 Package would contain:"
npm pack dist 2>/dev/null
tar -tzf *.tgz | head -20
rm -f *.tgz

echo ""
echo "✅ Test complete! The package is ready to publish."
echo "To actually publish, use: pnpm publish dist --access=public"
