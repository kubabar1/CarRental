CREATE TABLE IF NOT EXISTS users (
    id         SERIAL NOT NULL,
    name       VARCHAR(40) NOT NULL,
    surname    VARCHAR(40) NOT NULL,
    password   VARCHAR(100) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    phone      VARCHAR(20) NOT NULL,
    birth_date DATE        NOT NULL,
    enabled    boolean NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS user_roles (
    id      SERIAL         NOT NULL,
    type    VARCHAR(30) NOT NULL,
    label   VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (type)
);

CREATE TABLE IF NOT EXISTS app_users_roles (
    user_id      SERIAL NOT NULL,
    user_role_id INT NOT NULL,
    PRIMARY KEY (user_id, user_role_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (user_role_id) REFERENCES user_roles (id)
);