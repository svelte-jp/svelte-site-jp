# IMPORTANT: Don't use this Dockerfile in your own projects without also looking at the .dockerignore file.
# Without an appropriate .dockerignore, this Dockerfile will copy a large number of unneeded files into your image.

FROM mhart/alpine-node:14

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production

FROM node:14.15.4 AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

###
# Only copy over the Node pieces we need
# ~> Saves 35MB
###
FROM mhart/alpine-node:slim-14

WORKDIR /app
COPY --from=0 /app .
COPY --from=builder /app/.svelte-kit/ ./.svelte-kit/
COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/static/ ./static/
COPY --from=builder /app/content/ ./content/

EXPOSE 3000
CMD ["node", "build"]
