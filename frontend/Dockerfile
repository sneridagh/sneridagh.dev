# syntax=docker/dockerfile:1
ARG VOLTO_VERSION
FROM plone/frontend-builder:${VOLTO_VERSION} as builder

COPY --chown=node . /app/

RUN <<EOT
     make install
     yarn build
     rm -rf cache omelette .yarn/cache
EOT

FROM plone/frontend-prod-config:${VOLTO_VERSION}

LABEL maintainer="Victor Fernandez de Alba <sneridagh@gmail.com>" \
      org.label-schema.name="sneridagh-dev-frontend" \
      org.label-schema.description="sneridagh.dev frontend image" \
      org.label-schema.vendor="Victor Fernandez de Alba"

COPY --from=builder /app/ /app/
