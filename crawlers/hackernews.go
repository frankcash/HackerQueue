// package main

// import (
// 	"fmt"

// 	"github.com/HackerQueue/db/models"
// 	"github.com/gocolly/colly"
// )

// func main() {
// 	stories := []models.Item{}
// 	fmt.Print("hello")
// 	// Instantiate default collector
// 	c := colly.NewCollector(
// 		// Visit only domains: hackerspaces.org, wiki.hackerspaces.org
// 		colly.AllowedDomains("news.ycombinator.com"),
// 	)

// 	// On every a element which has href attribute call callback
// 	c.OnHTML(".athing", func(e *colly.HTMLElement) {
// 		temp := models.Item{}
// 		title := e.ChildText("a")
// 		link := e.ChildAttr("a[class=storylink]", "href")
// 		temp.StoryURL = link
// 		temp.Source = "https://news.ycombinator.com/"
// 		temp.Title = title

// 		// TODO crawled_at and comments
// 		fmt.Println("f", title)
// 		fmt.Println("l", link)
// 		stories = append(stories, temp)
// 	})

// 	// Before making a request print "Visiting ..."
// 	c.OnRequest(func(r *colly.Request) {
// 		fmt.Println("Visiting", r.URL.String())
// 	})

// 	c.Visit("https://news.ycombinator.com/")
// 	c.Wait()
// 	fmt.Println(stories)

// }
