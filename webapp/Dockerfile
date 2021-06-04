FROM caddy:2.2.1-alpine

WORKDIR /usr/src/app
# Copy config
COPY Caddyfile /etc/caddy/Caddyfile
# Copy dist files
COPY dist/sample-base-webapp/* ./

EXPOSE 62029