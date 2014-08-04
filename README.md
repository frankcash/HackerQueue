HackerQueue
=========

Your favorite tech sites compiled down to topics you find interesting.



==========
F.A.Q.
===

Q. Why did we create this?

A. HackerQueue was created because it gets annoying to go to more than one site for news, especially when you like to read a lot.

Q. Why does HackerQueue only display these three sites?

A. HackerQueue is currently purposed for news about Computer Science, Computer Engineering, Networking, and their cultures.  The direction I wish for it to take may change in the future though.

Q. Will HackerQueue ever support posts?

A. If enough users are accumulated.

Q. What if I want more sites to be added?

A. Please create an issue report and mark it as an enhancement.  I will look into it.  If the site is related to Comp Sci/Comp Eng/ Networking or their cultures I will probably add it when I get free time.

==========
API Routes
===

For Top Posts
==

| Call  | Site |
| ------------- | ------------- |
| /ycomb    | HackerNews  |
| /lobster  | Lobste.rs  |
| /rp       | /r/programming  |



For New Posts
==

| Call  | Site |
| ------------- | ------------- |
| /ynew  | HackerNews/New  |
| /lnew  | Lobste.rs/New  |
| /rnew  | /r/programming/New  |


Route Properties

```
var foo = [
  {
    "site" : "HN",
    "title": "Elvish – An experimental Unix shell in Go",
    "url": "https://github.com/xiaq/elvish",
    "comments": 26,
    "comments_link": "https://news.ycombinator.com/item?id=8090534"
  }
]
```
