# Build stage
FROM node:19 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:19-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 5173
CMD ["npm", "start"]
