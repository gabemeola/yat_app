package models

import (
	"encoding/json"
	"fmt"
	"testing"
	"utils/tests"
)

func TestJSONSerialization(t *testing.T) {
	var name = "Peter"
	var status = "success!"
	var resJSON = fmt.Sprintf(`{"status":"%s","content":{"name":"%s"}}`, status, name)

	response, err := json.Marshal(JSONResponse{
		Status: status,
		Content: map[string]string{
			"name": name,
		},
	})

	utils.AssertEqual(t, err, nil)
	utils.AssertEqual(t, string(response), resJSON)
}
