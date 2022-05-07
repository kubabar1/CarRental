CREATE TABLE comments
(
    id            INT      NOT NULL AUTO_INCREMENT,
    content       TEXT(10000) NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date DATETIME NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE rates
(
    id            INT      NOT NULL AUTO_INCREMENT,
    rate          INT      NOT NULL,
    vehicle_id    INT      NOT NULL,
    user_id       INT      NOT NULL,
    creation_date DATETIME NOT NULL,
    PRIMARY KEY (id)
);