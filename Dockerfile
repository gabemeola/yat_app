# Client Builder Image
FROM node:8.14 as PRODUCTION_ASSETS
WORKDIR /app
COPY ./client .
# Install dependencies
RUN yarn install --frozen-lockfile
# Build Project
RUN yarn build


# Server Golang binary build
FROM golang:1.11 as BUILD
WORKDIR /app
COPY ./server/src ./src
# Set GOPATH to workdir
ENV GOPATH=/app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o yat ./src/main.go

ENTRYPOINT ["/app/yat"]


# Set up Alpine Server
FROM alpine:3.8
MAINTAINER Gabe M <gabe@gabemeola.com>

WORKDIR /app
COPY --from=BUILD /app/yat /app/yat
COPY --from=PRODUCTION_ASSETS /app/build/ /app/build/
EXPOSE 8080

ENTRYPOINT ["/app/yat"]

