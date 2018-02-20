package crawlers

import (
	"fmt"
	"time"

	"github.com/HackerQueue/db/models"
	"github.com/gocolly/colly"
)

// HackerNews will return information from the desired hackernews link
func HackerNews(url string) []models.Item {
	stories := []models.Item{}
	fmt.Print("hello")
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("news.ycombinator.com"),
	)

	// On every a element which has href attribute call callback
	c.OnHTML(".athing", func(e *colly.HTMLElement) {
		temp := models.Item{}
		title := e.ChildText("a")
		link := e.ChildAttr("a[class=storylink]", "href")
		temp.StoryURL = link
		temp.Source = url
		temp.Title = title
		temp.CrawledAt = time.Now()
		temp.Comments = fmt.Sprintf("https://news.ycombinator.com/item?id=%s", e.Attr("id"))
		stories = append(stories, temp)
	})

	// Before making a request print "Visiting ..."
	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	c.Visit(url)
	c.Wait()
	return stories

}

// func main() {
// 	fmt.Println(HackerNews("https://news.ycombinator.com/newest"))
// }
