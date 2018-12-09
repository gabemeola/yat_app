package constants

import "os"

// JSONMime specifies JSON mime type
const JSONMime = "application/json; charset=utf-8"

// ENV may be "local" or "prod". Set by Kubernetes container
var ENV = os.Getenv("GO_ENV")

// IsProd describes with we are running in a production container
var IsProd = ENV == "prod"
