package main

import (
	"controllers"
	"fmt"
	"log"
	"net/http"
	"os"
	// "github.com/gorilla/mux"
)

func main() {
	// r := mux.NewRouter()
	var port = os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/api", func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(http.StatusOK)
		res.Write([]byte("Hello World"))
	})

	http.HandleFunc("/api/lists", controllers.Lists)
	http.HandleFunc("/api/list/", controllers.List)

	// Serve up build directory (frontend)
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./build"))))

	fmt.Println("\nApp up at PORT:", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}
