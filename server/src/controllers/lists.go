package controllers

import (
	"constants"
	"encoding/json"
	"models"
	"net/http"
)

var lists = []string{"Personal", "Chores", "Zelzen"}

// Lists controller returns current todo lists
func Lists(res http.ResponseWriter, req *http.Request) {
	jsonRes, err := json.Marshal(models.JSONResponse{
		Status:  "success",
		Content: lists,
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
