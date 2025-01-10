FROM nginx:alpine AS production

# Step 8: Copy built files to the nginx directory
COPY . /usr/share/nginx/html

# Step 9: Expose the port Vite will run on
EXPOSE 80

# Step 10: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]