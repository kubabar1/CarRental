CREATE TABLE IF NOT EXISTS rates(
    id            SERIAL      NOT NULL,
    rate          INT      NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments(
    id            SERIAL      NOT NULL,
    content       TEXT NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    rate_id       INT      NOT NULL,
    FOREIGN KEY (rate_id)  REFERENCES rates(id),
    PRIMARY KEY (id)
);