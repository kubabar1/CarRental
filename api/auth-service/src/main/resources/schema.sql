CREATE TABLE IF NOT EXISTS verification_token
(
    id                  INT         NOT NULL AUTO_INCREMENT,
    token               NVARCHAR(255) NOT NULL,
    user_id             INT NOT NULL,
    expiry_date         TIMESTAMP NOT NULL,
    UNIQUE (user_id)
);
