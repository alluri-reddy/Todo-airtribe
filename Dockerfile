FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Serve the built application using Nginx
FROM nginx:alpine

# Copy the built files from the build stage to Nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.config /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
