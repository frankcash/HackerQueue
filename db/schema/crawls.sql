CREATE TABLE crawls(
    crawl_id SERIAL PRIMARY KEY,
    story_url VARCHAR(255) NOT NULL,
    source INTEGER NOT NULL REFERENCES sources (id),
    title VARCHAR(255) NOT NULL,
    comments VARCHAR(255),
    crawled_at TIMESTAMP
);
CREATE UNIQUE INDEX crawls_unique_per_source_idx ON crawls (story_url, source);