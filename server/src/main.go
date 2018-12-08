package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	var port = os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Serve up build directory (frontend)
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./build"))))

	http.HandleFunc("/api", func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(http.StatusOK)
		res.Write([]byte("Hello World"))
	})

	fmt.Println("\nApp up at PORT:", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}
