# Production Assets Image
FROM node:8.14-alpine as PRODUCTION_ASSETS
WORKDIR /app
# Dependencies for install
RUN apk --no-cache add g++ gcc libgcc libstdc++ make
COPY . .
RUN yarn install --frozen-lockfile
# Build Project
RUN yarn build
# Rewrite with only production dependencies for copy.
RUN yarn install --frozen-lockfile --production


# Set up Alpine Server
FROM node:8.14-alpine
MAINTAINER Gabe M <gabe@gabemeola.com>

WORKDIR /app
ENV PORT=8080
EXPOSE 8080

# Copy Build assests
COPY --from=PRODUCTION_ASSETS /app/lib /app/lib
COPY --from=PRODUCTION_ASSETS /app/public /app/public
COPY package.json package.json
# Copy Production Dependencies
COPY --from=PRODUCTION_ASSETS /app/node_modules /app/node_modules
# Run app!
CMD yarn start

