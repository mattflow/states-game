# Step 1: Use an official Node.js image as the base
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the application
RUN npm run build

# Step 7: Use a lightweight web server to serve the static files
FROM nginx:alpine AS production

# Step 8: Copy built files to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose the port Vite will run on
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
