CREATE TABLE IF NOT EXISTS booking_states(
    booking_code VARCHAR(3)  NOT NULL,
    description  VARCHAR(50) NOT NULL,
    PRIMARY KEY (booking_code)
);

CREATE TABLE IF NOT EXISTS locations(
    id            SERIAL        NOT NULL,
    country       VARCHAR(50)  NOT NULL,
    city          VARCHAR(150) NOT NULL,
    street_and_nb VARCHAR(150) NOT NULL,
    code          VARCHAR(20)  NOT NULL,
    email         VARCHAR(255) NOT NULL,
    phone         VARCHAR(30)   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS bookings(
    id                 SERIAL         NOT NULL,
    user_id            BIGINT         NOT NULL,
    vehicle_id         BIGINT         NOT NULL,
    receipt_date       DATE       NOT NULL,
    return_date        DATE       NOT NULL,
    location_id        BIGINT         NOT NULL,
    booking_state_code VARCHAR(3)    NOT NULL,
    total_cost         decimal(15, 2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (location_id) REFERENCES Locations (id),
    FOREIGN KEY (booking_state_code) REFERENCES booking_states (booking_code)
);