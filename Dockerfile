FROM nginx:alpine

# Copy nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files into Nginx public directory
COPY . /usr/share/nginx/html

# Clean up unwanted directories inside image to keep it lightweight
RUN rm -rf /usr/share/nginx/html/.git /usr/share/nginx/html/images/*.png

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
