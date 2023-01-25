CREATE TABLE IF NOT EXISTS verification_token
(
    id                  INT         NOT NULL AUTO_INCREMENT,
    token               NVARCHAR(255) NOT NULL,
    user_id             INT NOT NULL,
    expiry_date         TIMESTAMP NOT NULL,
    UNIQUE (user_id),
    UNIQUE (token)
);

create table if not exists persistent_logins (
  username varchar_ignorecase(100) not null,
  series varchar(64) primary key,
  token varchar(64) not null,
  last_used timestamp not null
);