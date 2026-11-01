# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.4.0
ARG NGINX_VERSION=1.31.7

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /usr/src/app

# COPY (not a bind mount) so the layer cache key changes with package*.json:
# podman/buildah ignore bind-mount contents when matching cached layers.
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

# Vite inlines VITE_* at build time; the image is tied to one API origin.
ARG VITE_API_URL
RUN npm run build

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080
