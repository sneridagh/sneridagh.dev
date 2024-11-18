# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION:-18.1.0} as builder

COPY --chown=node packages/volto-sneridagh-dev /app/packages/volto-sneridagh-dev
COPY --chown=node volto.config.js /app/
COPY --chown=node package.json /app/package.json.temp

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
     python3 -c "import json; data = json.load(open('package.json.temp')); deps = data['dependencies']; data['dependencies'].update(deps); json.dump(data, open('package.json', 'w'), indent=2)"
     pnpm install && pnpm build:deps
     pnpm build
     pnpm install --prod
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION:-18.1.0}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-frontend" \
      org.label-schema.description="sneridagh.dev frontend image" \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/
