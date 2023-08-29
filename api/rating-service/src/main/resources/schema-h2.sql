CREATE TABLE IF NOT EXISTS rates
(
    id            INT      NOT NULL AUTO_INCREMENT,
    rate          INT      NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS comments
(
    id            INT      NOT NULL AUTO_INCREMENT,
    content       TEXT(10000) NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date DATETIME NOT NULL,
    rate_id       INT      NOT NULL,
    FOREIGN KEY (rate_id)  REFERENCES rates(id),
    PRIMARY KEY (id)
);