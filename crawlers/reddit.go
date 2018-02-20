package main

import (
	"fmt"
	"time"

	"github.com/HackerQueue/db/models"
	"github.com/gocolly/colly"
)

type Item struct {
	StoryURL  string
	Source    string
	comments  string
	CrawledAt time.Time
	Comments  string
	Title     string
}

func main() {
	stories := []models.Item{}
	fmt.Print("hello")
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("www.reddit.com"),
	)

	// On every a element which has href attribute call callback
	c.OnHTML(".top-matter", func(e *colly.HTMLElement) {
		// fmt.Println(e)
		temp := models.Item{}
		temp.StoryURL = e.ChildAttr("a[data-event-action=title]", "href")
		temp.Source = "https://www.reddit.com/r/programming/"
		temp.Title = e.ChildText("a[data-event-action=title]")
		temp.Comments = e.ChildAttr("a[data-event-action=comments]", "href")
		temp.CrawledAt = time.Now()

		stories = append(stories, temp)
	})

	c.OnHTML("span.next-button", func(h *colly.HTMLElement) {

		t := h.ChildAttr("a", "href")
		// fmt.Println("t", t)
		c.Visit(t)
	})

	c.Limit(&colly.LimitRule{
		Parallelism: 2,
		RandomDelay: 5 * time.Second,
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())

	})
	c.Visit("https://www.reddit.com/r/programming/")
	c.Wait()
	fmt.Println(stories)

}
