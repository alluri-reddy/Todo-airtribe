FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production  # Use npm ci for faster installs with lockfile

COPY . .

RUN npm run build



FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.config /etc/nginx/nginx.conf


EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

