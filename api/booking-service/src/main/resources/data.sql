DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS booking_states;
DROP TABLE IF EXISTS locations;

CREATE TABLE booking_states
(
    booking_code NVARCHAR(3)  NOT NULL,
    description  NVARCHAR(50) NOT NULL,
    PRIMARY KEY (booking_code)
);

CREATE TABLE Locations
(
    id            BIGINT        NOT NULL AUTO_INCREMENT,
    country       NVARCHAR(50)  NOT NULL,
    city          NVARCHAR(150) NOT NULL,
    street_and_nb NVARCHAR(150) NOT NULL,
    code          NVARCHAR(20)  NOT NULL,
    email         NVARCHAR(255) NOT NULL,
    phone         VARCHAR(30)   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE bookings
(
    id                 BIGINT         NOT NULL AUTO_INCREMENT,
    user_id            BIGINT         NOT NULL,
    vehicle_id         BIGINT         NOT NULL,
    receipt_date       DATETIME       NOT NULL,
    return_date        DATETIME       NOT NULL,
    location_id        BIGINT         NOT NULL,
    booking_state_code NVARCHAR(3)    NOT NULL,
    total_cost         decimal(15, 2) NOT NULL,
    PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users (id),
--     FOREIGN KEY (vehicle_id) REFERENCES vehicles (id),
    FOREIGN KEY (location_id) REFERENCES Locations (id),
    FOREIGN KEY (booking_state_code) REFERENCES booking_states (booking_code)
);

INSERT INTO booking_states
VALUES ('CAN', 'canceled'),
       ('REN', 'rented'),
       ('RES', 'reserved'),
       ('RET', 'returned');

INSERT INTO locations (country, city, street_and_nb, code, email, phone)
VALUES ('Poland', 'Wrocław', 'ul. Testowa 12/3', '11-123', 'test1@mail.com', '321 321 321'),
       ('Poland', 'Warszawa', 'ul. Testowa 21/62', '22-432', 'test2@mail.com', '123 123 123');

INSERT INTO bookings (user_id, vehicle_id, receipt_date, return_date, location_id, booking_state_code, total_cost)
VALUES (1, 1, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RET', 123.21),
       (1, 15, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RES', 123.21),
       (1, 16, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'REN', 123.21),
       (2, 2, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RES', 241.51),
       (3, 3, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'CAN', 423.33),
       (4, 4, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 2, 'RES', 1222.87),
       (5, 5, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'REN', 1421.44),
       (6, 6, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RES', 322.12),
       (7, 7, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 2, 'RET', 653.55),
       (8, 8, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 2, 'RET', 346.43),
       (9, 9, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RET', 634.54),
       (10, 10, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'CAN', 1223.32),
       (11, 11, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 2, 'CAN', 223.87),
       (12, 12, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'CAN', 433.98),
       (13, 13, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 2, 'RES', 2123.67),
       (14, 14, {ts '2020-09-17 18:47:52.69'}, {ts '2020-09-17 18:47:52.69'}, 1, 'RES', 1223.76);
