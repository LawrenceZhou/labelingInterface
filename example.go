package main

import (
 "net/http"
  "github.com/gin-gonic/gin"
  "github.com/gin-gonic/contrib/static"
)

func main() {
  r := gin.Default()

  r.Use(static.Serve("/",static.LocalFile("./templates", true)))


  api := r.Group("/api")
  {
    api.POST("/save", saveHandler)
  }
  r.Run()
}

func saveHandler(c *gin.Context) {
      c.JSON(http.StatusOK, gin.H {
        "message": "pong",
      })
    }