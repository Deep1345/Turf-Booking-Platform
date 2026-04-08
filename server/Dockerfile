FROM node:18-alpine

WORKDIR /app

# Copy package configurations first for better cache utilization
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Expose the API port
EXPOSE 5001

# Start the server
CMD ["node", "server.js"]
