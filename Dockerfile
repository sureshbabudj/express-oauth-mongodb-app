# Use a Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /var/www/express-oauth-mongodb-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port that the web server will listen on
EXPOSE 8080

# Run the application
CMD [ "npm", "start" ]
