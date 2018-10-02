CREATE TABLE crawls(
    crawl_id SERIAL PRIMARY KEY,
    story_url VARCHAR(255) UNIQUE,
    source VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    comments VARCHAR(255),
    crawled_at TIMESTAMP,
    published_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);