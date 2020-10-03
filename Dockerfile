# stage1 as builder
FROM node:10-alpine as builder

WORKDIR /react-weather-app

# Copy npm config
COPY .npmrc /root/.npmrc

# Copy the package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the files
COPY . .

# Build the project
RUN npm run build

FROM nginx:alpine as production-build
COPY nginx-custom.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /react-weather-app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
