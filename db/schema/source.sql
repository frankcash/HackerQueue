CREATE TABLE source(
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP
);

INSERT INTO "source" ("source", "created_at") VALUES('hacker news', now()), ('lobste.rs', now()), ('/r/programming', now());