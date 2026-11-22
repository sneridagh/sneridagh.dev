# syntax=docker/dockerfile:1
# Nick image for sneridagh.dev: the official plone/nick image plus the add-ons
# in packages/. See https://github.com/plone/container-nick#add-ons
ARG NICK_VERSION=3.1.0
FROM plone/nick:${NICK_VERSION}

LABEL maintainer="Victor Fernandez de Alba" \
      org.label-schema.name="sneridagh-dev-nick" \
      org.label-schema.description="sneridagh.dev Nick backend with the sneridagh-dev site profile and the nick-blog add-on"

# Add-ons in /app/packages are workspace packages of the image's project
COPY --chown=node:node packages /app/packages
RUN pnpm add "nick-blog@workspace:*" "sneridagh-dev@workspace:*"

# The site profile depends on @plone/nick:core and nick-blog:default
ENV PROFILES=sneridagh-dev:default
