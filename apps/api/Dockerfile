# use the official Bun image
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Copy root configuration files
COPY package.json tsconfig.json ./

# Copy workspace package.json files to preserve structure
# This is crucial for Bun to resolve the workspace graph correctly
COPY apps/api/package.json ./apps/api/
COPY apps/client/package.json ./apps/client/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
# --production: skip devDependencies (keeps image smaller)
RUN bun install --production

# Copy source code for the API and Shared packages
# We don't need to copy apps/client source as it's not used by the API
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

# Set working directory to the API application
WORKDIR /usr/src/app/apps/api

# Expose the port the app runs on
EXPOSE 3000

# Start the application
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
