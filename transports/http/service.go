package http

import (
	"os"
	"time"

	"github.com/HackerQueue/transports/http/json/handlers"
	"github.com/gin-gonic/gin"
)

// Env will attempt to get an OS Env or return a fallback
func Env(variable string, fallback string) string {
	if value := os.Getenv(variable); value != "" {
		return value
	}

	return fallback
}

func NewService() *Service {
	return &Service{}
}

type Service struct {
	Launched time.Time
}

func (s *Service) Start() {
	s.Launched = time.Now()

	router := gin.Default()

	router.GET("/ynew", handlers.GetHNNew)
	router.GET("/ycomb", handlers.GetHNTop)

	router.GET("/lnew", handlers.GetLobNew)
	router.GET("/lobster", handlers.GetLobTop)

	router.GET("/rnew", handlers.GetRedditNew)
	router.GET("/rp", handlers.GetRedditTop)

	router.GET("/status", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message":  "ok",
			"launched": s.Launched,
		})
	})

	router.Run(Env("PORT", ":5000"))
}
