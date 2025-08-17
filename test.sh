#!/bin/bash

echo "Testing favicon service endpoints..."

# Test health endpoint
echo "Testing /health"
curl -s http://localhost:8787/health

echo -e "\n\nTesting /google.com (should return favicon)"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/google.com

echo -e "\n\nTesting /google.com.json (debug endpoint)"
curl -s http://localhost:8787/google.com.json | head -n 5

echo -e "\n\nTesting invalid host /localhost"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/localhost

echo -e "\n\nTesting with theme parameter"
curl -s -o /dev/null -w "%{http_code}" http://localhost:8787/github.com?theme=dark

echo -e "\n\nTest complete!"