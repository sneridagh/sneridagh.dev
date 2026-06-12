# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION:-19.1.4} AS builder

COPY --chown=node packages/aurora-sneridagh-dev /app/packages/aurora-sneridagh-dev
COPY --chown=node registry.config.ts /app/
COPY --chown=node Makefile /app/Makefile
COPY --chown=node pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --chown=node .pnpmfile.cjs /app/.pnpmfile.cjs
COPY --chown=node package.json /app/package.json
COPY --chown=node mrs.developer.json /app/mrs.developer.json
COPY --chown=node pnpm-lock.yaml /app/pnpm-lock.yaml

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    set -e
    rm -rf core
    make install
    pnpm build
    # This is necessary because the build is trying to recreate the node_modules folder
    # by telling it to CI=1 it will just recreate them
    CI=1 pnpm install --prod
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION:-19.1.4}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-plone-aurora-frontend" \
      org.label-schema.description="sneridagh.dev Plone Aurora add-on frontend image." \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/

RUN <<EOT
    set -e
    corepack enable pnpm
    corepack prepare pnpm@10.20.0 --activate
EOT
