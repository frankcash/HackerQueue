package crawlers

import (
	"fmt"
	"time"

	"github.com/HackerQueue/db/models"
	"github.com/gocolly/colly"
)

func Lobsters(url string) []models.Item {
	stories := []models.Item{}
	fmt.Print("hello")
	// Instantiate default collector
	c := colly.NewCollector(
		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
		colly.AllowedDomains("lobste.rs"),
	)

	c.Limit(&colly.LimitRule{
		Parallelism: 2,
		RandomDelay: 5 * time.Second,
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())

	})

	//class="story_liner"
	c.OnHTML(".story_liner", func(e *colly.HTMLElement) {
		temp := models.Item{}
		link, ok := e.DOM.Find("span.comments_label").Children().Attr("href")
		if ok != true {
			link = url
		}
		temp.Comments = link
		temp.StoryURL, _ = e.DOM.Find("span.link").Children().Attr("href")
		temp.Source = url
		temp.Title = e.ChildText("span[class=link]")
		temp.CrawledAt = time.Now()

		// fmt.Println(temp.StoryURL)
		// fmt.Println(temp.Title)

		stories = append(stories, temp)

	})

	c.Visit(url)
	c.Wait()
	return stories

}

// func main() {
// 	// fmt.Println()
// 	Lobsters("https://lobste.rs/")
// }
