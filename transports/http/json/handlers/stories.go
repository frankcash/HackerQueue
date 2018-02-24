package handlers

import (
	"github.com/HackerQueue/crawlers"
	"github.com/gin-gonic/gin"
)

func GetRedditNew(c *gin.Context) {
	stories := crawlers.Reddits("https://www.reddit.com/r/programming/new/")
	c.JSON(200, stories)
}

func GetRedditTop(c *gin.Context) {
	stories := crawlers.Reddits("https://www.reddit.com/r/programming/")
	c.JSON(200, stories)
}

func GetHNNew(c *gin.Context) {
	stories := crawlers.HackerNews("https://news.ycombinator.com/newest")
	c.JSON(200, stories)
}

func GetHNTop(c *gin.Context) {
	stories := crawlers.HackerNews("https://news.ycombinator.com/")
	c.JSON(200, stories)
}

func GetLobTop(c *gin.Context) {
	stories := crawlers.HackerNews("https://lobste.rs/")
	c.JSON(200, stories)
}

func GetLobNew(c *gin.Context) {
	stories := crawlers.HackerNews("https://lobste.rs/recent")
	c.JSON(200, stories)
}
