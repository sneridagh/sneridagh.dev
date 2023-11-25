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

LABEL maintainer="kitconcept GmbH <server@kitconcept.com>" \
      org.label-schema.name="intra.kitconcept.com-frontend" \
      org.label-schema.description="kitconcept Intranet frontend image." \
      org.label-schema.vendor="kitconcept GmbH"

COPY --from=builder /app/ /app/
