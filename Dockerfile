FROM node:20-slim

WORKDIR /app

# 1. Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json ./

# Copy the .tgz file created by npm pack
COPY *.tgz ./

# Install the package from the tgz
RUN npm install

# Copy your entry point (usually index.js or dist/index.js)
COPY . .

# Set environment variables to point to internal K8s services
ENV SERVICE_NAME="policy-servicing"
ENV ETCD_ENDPOINT="http://etcd:2379"
ENV TEMPO_ENDPOINT="http://tempo:4318"
ENV LOKI_HOST="http://loki:3100"
ENV ASB_CONNECTION_STRING=Endpoint=sb://sierra-platform.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=SCvGdrQHv5me/oNBWCeUhx4SbPxmb6IP9+ASbJ7T/R8=

CMD ["npm", "start"]