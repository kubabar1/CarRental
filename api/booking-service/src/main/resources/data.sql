DROP TABLE IF EXISTS BookingsChanges;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS BookingStates;
DROP TABLE IF EXISTS Locations;

CREATE TABLE BookingStates
(
    bookingCode NVARCHAR(3)  NOT NULL,
    description NVARCHAR(50) NOT NULL,
    PRIMARY KEY (bookingCode)
);

CREATE TABLE Locations
(
    ID          BIGINT        NOT NULL AUTO_INCREMENT,
    country     NVARCHAR(50)  NOT NULL,
    city        NVARCHAR(150) NOT NULL,
    streetAndNb NVARCHAR(150) NOT NULL,
    code        NVARCHAR(20)  NOT NULL,
    email       NVARCHAR(255) NOT NULL,
    phone       VARCHAR(30)   NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Bookings
(
    ID               BIGINT         NOT NULL AUTO_INCREMENT,
    userID           BIGINT         NOT NULL,
    vehicleID        BIGINT         NOT NULL,
    receiptDate      DATETIME       NOT NULL,
    returnDate       DATETIME       NOT NULL,
    locationID       BIGINT         NOT NULL,
    bookingStateCode NVARCHAR(3)    NOT NULL,
    totalCost        decimal(15, 2) NOT NULL,
    PRIMARY KEY (ID),
--     FOREIGN KEY (userID) REFERENCES Users (ID),
--     FOREIGN KEY (vehicleID) REFERENCES Vehicles (ID),
    FOREIGN KEY (locationID) REFERENCES Locations (ID),
    FOREIGN KEY (bookingStateCode) REFERENCES BookingStates (bookingCode)
);

CREATE TABLE BookingsChanges
(
    ID         BIGINT        NOT NULL AUTO_INCREMENT,
    bookingID  BIGINT        NOT NULL,
    userId     BIGINT        NOT NULL,
    changeDate DATETIME      NOT NULL DEFAULT NOW(),
    ipAddress  NVARCHAR(100) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (bookingID) REFERENCES Bookings (ID)
);

INSERT INTO BookingStates
VALUES ('CAN', 'canceled'),
       ('REN', 'rented'),
       ('RES', 'reserved'),
       ('RET', 'returned');

INSERT INTO Locations (country, city, streetAndNb, code, email, phone)
VALUES ('Poland', 'Wrocław', 'ul. Testowa 12/3', '11-123', 'test1@mail.com', '321 321 321'),
       ('Poland', 'Warszawa', 'ul. Testowa 21/62', '22-432', 'test2@mail.com', '123 123 123');

INSERT INTO Bookings (userID, vehicleID, receiptDate, returnDate, locationID, bookingStateCode, totalCost)
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

INSERT INTO BookingsChanges (bookingID, changeDate, userId, ipAddress)
VALUES (1, {ts '2020-09-17 18:47:52.69'}, 1, '300:300:300:300')