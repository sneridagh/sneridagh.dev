# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM ghcr.io/kitconcept/frontend-builder:${VOLTO_VERSION} as builder

COPY --chown=node packages/volto-sneridagh-dev /app/packages/volto-sneridagh-dev
COPY --chown=node volto.config.js /app/

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
     python3 -c "import json; data = json.load(open('package.json')); data['dependencies'].update({'volto-sneridagh-dev': 'workspace:*'}); json.dump(data, open('package.json', 'w'), indent=2)"
     pnpm install
     pnpm build
     pnpm install --prod
     echo "asd"
EOT

FROM ghcr.io/kitconcept/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-frontend" \
      org.label-schema.description="sneridagh.dev frontend image" \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/
