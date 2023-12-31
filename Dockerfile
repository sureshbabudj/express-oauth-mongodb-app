# Use a Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /var/www/express-oauth-mongodb-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Copy the docker-entrypoint.js file
COPY docker-entrypoint.js .

# Set the entrypoint to run the docker-entrypoint.js file
ENTRYPOINT ["node", "docker-entrypoint.js"]
