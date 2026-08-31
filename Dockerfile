# -----------------------------
# Build stage
# -----------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Enable Corepack and use a fixed pnpm version
RUN corepack enable \
    && corepack prepare pnpm@11.12.0 --activate

# Workspace/package files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.base.json ./

# Libraries
COPY Libraries ./Libraries

# Backends
COPY Backend ./Backend

# Install workspace dependencies
RUN pnpm install --frozen-lockfile

# Build systems service and required workspace dependencies
RUN pnpm --filter @menorahgroupmep/systems... build


# -----------------------------
# Production stage
# -----------------------------
FROM node:22-alpine AS production

WORKDIR /app

RUN corepack enable \
    && corepack prepare pnpm@11.12.0 --activate

# Copy built workspace
COPY --from=builder /app /app

WORKDIR /app/Backend/systems

ENV NODE_ENV=production

EXPOSE 4008

CMD ["pnpm", "start"]