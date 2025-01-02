FROM node:18-alpine

WORKDIR /app

# Clear npm cache first
RUN npm cache clean --force

# Copy package files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies with specific flags
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
