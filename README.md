HackerQueue
=========
[![Build Status](https://travis-ci.org/frankcash/HackerQueue.svg?branch=master)](https://travis-ci.org/frankcash/HackerQueue)

Your favorite tech sites compiled down to topics you find interesting.

Scrapes [HackerNews](https://news.ycombinator.com/), [Lobste.rs](https://lobste.rs/), and [/r/programming](https://www.reddit.com/r/programming) and then compiles them into a searchable and viewable source.

![HackerQueue](https://raw.githubusercontent.com/frankcash/HackerQueue/master/images/example.png)


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

Q. What is the purpose of the Database?

A. This is purely experimental right now, you could possible run analytics queries on it if you want.


#### API Routes


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


## Route Properties
```
var foo = [
  {
    "site" : "HN",
    "title": "Elvish – An experimental Unix shell in Go",
    "url": "https://github.com/xiaq/elvish",
    "comments": 26,
    "comments_link": "https://news.ycombinator.com/item?id=8090534",
    "points": 1337
  }
]
```

## Database Config

1. Create the table(s) defined in `db/schema/`.
2. Make sure you have an env variable `DATABASE_URL="postgres://<user>:<password>@<host>:<port>/<database>"`.  If using docker-compose don't worry about the port.


## To Run Locally
```
$npm install #installs dependencies
$node app.js #runs the program
```


## To run in Docker
```
$ docker build -t hackerqueue:latest .   
$ docker run -p [desired out port]:3000 -d hackerqueue:latest
```

## Running in Compose
```
$ docker-compose up --build
```

# BTC

If you like this project please consider donating BTC `14wcBFByfvf3PAnXD6wW7Ytsif21ftGa5U`
