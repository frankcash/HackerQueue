package models

import (
	"time"
)

type Item struct {
	StoryURL  string
	Source    string
	comments  string
	CrawledAt time.Time
	Comments  string
	Title     string
}
