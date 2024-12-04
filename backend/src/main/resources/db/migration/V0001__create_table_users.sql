-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id         UUID PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    password   TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name  TEXT,
    role       TEXT NOT NULL
);
