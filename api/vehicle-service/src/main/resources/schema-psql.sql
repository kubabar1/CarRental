CREATE TABLE IF NOT EXISTS colors(
    color VARCHAR(30) NOT NULL,
    PRIMARY KEY(color)
);

CREATE TABLE IF NOT EXISTS body_types(
    body_type VARCHAR(30) NOT NULL,
    PRIMARY KEY(body_type)
);

CREATE TABLE IF NOT EXISTS fuel_types(
    fuel_type VARCHAR(30) NOT NULL,
    PRIMARY KEY(fuel_type)
);

CREATE TABLE IF NOT EXISTS brands(
    brand VARCHAR(50) NOT NULL,
    PRIMARY KEY(brand)
);

CREATE TABLE IF NOT EXISTS models(
    model VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    FOREIGN KEY(brand) REFERENCES brands(brand),
    PRIMARY KEY(model),
    UNIQUE (model, brand)
);

CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL NOT NULL,
    registration VARCHAR(20) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    daily_fee decimal(15,2) NOT NULL,
    location_id INT NOT NULL,
    best_offer BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(brand) REFERENCES brands(brand),
    FOREIGN KEY(model) REFERENCES models(model),
    UNIQUE (registration)
);

CREATE TABLE IF NOT EXISTS vehicle_details(
    vehicle_id SERIAL NOT NULL,
    body_type VARCHAR(50) NOT NULL,
    production_year INT NOT NULL,
    fuel_type VARCHAR(30) NOT NULL,
    power INT NOT NULL,
    gearbox VARCHAR(30) NOT NULL,
    front_wheel_drive BOOLEAN NOT NULL,
    doors_number INT NOT NULL,
    seats_number INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    metallic BOOLEAN NOT NULL,
    image_name VARCHAR(70) NOT NULL,
    description VARCHAR(100) NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY (color) REFERENCES colors(color),
    FOREIGN KEY (body_type) REFERENCES body_types(body_type),
    FOREIGN KEY (fuel_type) REFERENCES fuel_types(fuel_type),
    UNIQUE (vehicle_id)
);

CREATE TABLE IF NOT EXISTS equipment(
    equipment_code VARCHAR(3) NOT NULL,
    description VARCHAR(50) NOT NULL,
    PRIMARY KEY(equipment_code)
);

CREATE TABLE IF NOT EXISTS eqp(
    vehicle_id INT NOT NULL,
    equipment_id VARCHAR(3) NOT NULL,
    PRIMARY KEY(vehicle_id, equipment_id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY(equipment_id) REFERENCES equipment(equipment_code)
);