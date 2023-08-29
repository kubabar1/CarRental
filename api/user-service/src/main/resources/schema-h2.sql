CREATE TABLE IF NOT EXISTS users
(
    id         INT         NOT NULL AUTO_INCREMENT,
    name       NVARCHAR(40) NOT NULL,
    surname    NVARCHAR(40) NOT NULL,
    password   NVARCHAR(100) NOT NULL,
    email      NVARCHAR(255) NOT NULL,
    phone      VARCHAR(20) NOT NULL,
    birth_date DATE        NOT NULL,
    enabled    boolean NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS user_roles
(
    id      INT         NOT NULL AUTO_INCREMENT,
    type    VARCHAR(30) NOT NULL,
    label   VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (type)
);

CREATE TABLE IF NOT EXISTS app_users_roles
(
    user_id      INT NOT NULL,
    user_role_id INT NOT NULL,
    PRIMARY KEY (user_id, user_role_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (user_role_id) REFERENCES user_roles (id)
);