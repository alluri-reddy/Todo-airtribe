# Set the base image and name it "build"
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Build the frontend of the application
RUN npm run build

# Set the base image for the second stage and use Nginx with Alpine Linux
FROM nginx:alpine

# Copy the built frontend files from the "build" stage to the default Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to allow incoming HTTP traffic
EXPOSE 80

# Start Nginx server and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]


