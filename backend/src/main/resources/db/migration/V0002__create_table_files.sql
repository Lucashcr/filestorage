-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE files
(
    id    UUID PRIMARY KEY,
    type  TEXT,
    title TEXT,
    path  TEXT,
    size  BIGINT
);
