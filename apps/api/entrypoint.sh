#!/bin/sh

echo "Running migrations..."
npx typeorm migration:run --dataSource=dist/data-source.js

echo "Starting the app..."
node dist/main.js