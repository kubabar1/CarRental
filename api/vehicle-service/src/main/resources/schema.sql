CREATE TABLE IF NOT EXISTS colors(
  color NVARCHAR(30) NOT NULL,
  PRIMARY KEY(color)
);

CREATE TABLE IF NOT EXISTS body_types(
  body_type NVARCHAR(30) NOT NULL,
  PRIMARY KEY(body_type)
);

CREATE TABLE IF NOT EXISTS fuel_types(
  fuel_type NVARCHAR(30) NOT NULL,
  PRIMARY KEY(body_type)
);

CREATE TABLE IF NOT EXISTS brands(
  brand NVARCHAR(50) NOT NULL,
  PRIMARY KEY(brand)
);

CREATE TABLE IF NOT EXISTS models(
  model NVARCHAR(50) NOT NULL,
  brand NVARCHAR(50) NOT NULL,
  FOREIGN KEY(brand) REFERENCES brands(brand),
  PRIMARY KEY(model),
  UNIQUE (model, brand)
);

CREATE TABLE IF NOT EXISTS vehicles(
  id INT NOT NULL AUTO_INCREMENT,
  registration NVARCHAR(20) NOT NULL,
  brand NVARCHAR(50) NOT NULL,
  model NVARCHAR(50) NOT NULL,
  daily_fee decimal(15,2) NOT NULL,
  location_id INT NOT NULL,
  best_offer TINYINT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(brand) REFERENCES brands(brand),
  FOREIGN KEY(model) REFERENCES models(model),
  UNIQUE (registration)
);

CREATE TABLE IF NOT EXISTS vehicle_details(
  vehicle_id INT NOT NULL AUTO_INCREMENT,
  body_type NVARCHAR(50) NOT NULL,
  production_year INT NOT NULL,
  fuel_type NVARCHAR(30) NOT NULL,
  power INT NOT NULL,
  gearbox NVARCHAR(30) NOT NULL,
  front_wheel_drive TINYINT NOT NULL,
  doors_number INT NOT NULL,
  seats_number INT NOT NULL,
  color NVARCHAR(50) NOT NULL,
  metallic TINYINT NOT NULL,
  image_name NVARCHAR(70) NOT NULL,
  description NVARCHAR(100) NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY (color) REFERENCES colors(color),
  FOREIGN KEY (body_type) REFERENCES body_types(body_type),
  FOREIGN KEY (fuel_type) REFERENCES fuel_types(fuel_type),
  UNIQUE (vehicle_id)
);

CREATE TABLE IF NOT EXISTS equipment(
  equipment_code NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(equipment_code)
);

CREATE TABLE IF NOT EXISTS eqp(
  vehicle_id INT NOT NULL,
  equipment_id NVARCHAR(3) NOT NULL,
  PRIMARY KEY(vehicle_id, equipment_id),
  FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY(equipment_id) REFERENCES equipment(equipment_code)
);