
FROM node:16 as build


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=build /app/build /usr/share/nginx/html


EXPOSE 80

# Start Nginx server and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]


