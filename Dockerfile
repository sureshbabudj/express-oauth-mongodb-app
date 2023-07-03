# Use a Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /var/www/express-oauth-mongodb-app
# Set ownership and permissions for the data directory
RUN chown -R node:node /var/www/express-oauth-mongodb-app/data
RUN chmod u+rw -R /var/www/express-oauth-mongodb-app/data

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set the environment variable for the port (default: 80)
ARG PORT=80
ENV PORT $PORT

# Expose the port that the web server will listen on
EXPOSE 8080

# Run the application
CMD ["pm2-runtime", "pm2.config.js"]
