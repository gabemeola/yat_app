# Base golang image
FROM golang:1.11 as BASE

# This library is used for auto-reloading the
# application on changes, and can be used as a task runner.
# https://github.com/oxequa/realize
RUN go get github.com/oxequa/realize


# Golang binary build
FROM BASE as BUILD
WORKDIR /app
COPY ./src ./src
# Set GOPATH to workdir
ENV GOPATH=/app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o yat ./src/main.go

ENTRYPOINT ["/app/yat"]


# Set up Alpine Server
FROM alpine:3.8
MAINTAINER Gabe M <gabe@gabemeola.com>

WORKDIR /app
COPY --from=BUILD /app/yat /app/yat
EXPOSE 8080

ENTRYPOINT ["/app/yat"]
