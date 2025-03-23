# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION:-18.10.0} AS builder

COPY --chown=node packages/seven-sneridagh-dev /app/packages/seven-sneridagh-dev
COPY --chown=node registry.config.ts /app/
COPY --chown=node Makefile /app/Makefile
COPY --chown=node pnpm-workspace.yaml /app/pnpm-workspace.yaml
COPY --chown=node package.json /app/package.json.temp

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    set -e
    python3 -c "import json; data = json.load(open('package.json.temp')); deps = data['dependencies']; data['dependencies'].update(deps); json.dump(data, open('package.json', 'w'), indent=2)"
    (cd core && git fetch --depth 1 origin 7:7 && git checkout 7)
    pnpm install && make build-deps
    pnpm build
    pnpm install --prod
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION:-18.10.0}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-frontend" \
      org.label-schema.description="sneridagh.dev frontend image" \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/
ENTRYPOINT [ "pnpm" ]
CMD ["start:prod"]
