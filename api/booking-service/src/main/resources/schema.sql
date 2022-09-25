CREATE TABLE IF NOT EXISTS booking_states
(
    booking_code NVARCHAR(3)  NOT NULL,
    description  NVARCHAR(50) NOT NULL,
    PRIMARY KEY (booking_code)
);

CREATE TABLE IF NOT EXISTS locations
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

CREATE TABLE IF NOT EXISTS bookings
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