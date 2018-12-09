package models

// JSONResponse defines the model for sending a http json response
type JSONResponse struct {
	Status    string      `json:"status"`
	ErrorCode int         `json:"errorCode,omitempty"`
	Content   interface{} `json:"content"`
}
