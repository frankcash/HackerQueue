CREATE TABLE crawls(
    crawl_id SERIAL PRIMARY KEY,
    story_url VARCHAR(2083) UNIQUE,
    source VARCHAR(50) NOT NULL,
    title VARCHAR(2000),
    comments TEXT,
    crawled_at TIMESTAMP
);
