package controllers

import (
	"constants"
	"encoding/json"
	"models"
	"net/http"
)

// List controller returns current todo lists
func List(res http.ResponseWriter, req *http.Request) {
	if len(req.URL.Path) <= 10 {
		http.Error(res, "Required list param missing", 400)
		return
	}

	jsonRes, err := json.Marshal(models.JSONResponse{
		Status:  "success",
		Content: req.URL.Path[10:],
	})

	if err == nil {
		// Set Content-Type to JSON
		res.Header().Set("Content-Type", constants.JSONMime)
		res.WriteHeader(http.StatusOK)
		res.Write(jsonRes)
	} else {
		http.Error(res, "A fatal error ocurred", 500)
	}
}
