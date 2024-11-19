# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION:-18.1.0} AS builder

COPY --chown=node . /app/rr7
COPY --chown=node ./pnpm-workspace.yaml /app/pnpm-workspace.yaml

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    (cd core && git fetch --depth 1 origin slots-base:slots-base && git checkout slots-base)
    pnpm install && pnpm build:deps
    echo "asd"
    pnpm --filter @plone/client build && pnpm --filter @plone/providers build
EOT

RUN <<EOT
    set -e
    cd /app/rr7 && pnpm build
EOT

FROM node:22-slim

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-rr7-frontend" \
      org.label-schema.description="sneridagh.dev RR7 frontend image" \
      org.label-schema.vendor="Victor Fernandez de Alba"

# Install busybox and wget
RUN <<EOT
    set -e
    apt update
    apt install -y --no-install-recommends busybox wget git
    busybox --install -s
    rm -rf /var/lib/apt/lists/*
    mkdir /app
    chown -R node:node /app
EOT

RUN corepack use pnpm@9
RUN corepack enable

# Run the image with user node
USER node

COPY --from=builder /app/ /app/
WORKDIR /app/rr7

# Expose default Express port
EXPOSE 3000

# Set healthcheck to port 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s CMD [ -n "$LISTEN_PORT" ] || LISTEN_PORT=3000 ; wget -q http://127.0.0.1:"$LISTEN_PORT"/ok -O - || exit 1

# Entrypoint would be pnpm
ENTRYPOINT [ "pnpm" ]

# And the image will run in production mode
CMD ["start:prod"]
