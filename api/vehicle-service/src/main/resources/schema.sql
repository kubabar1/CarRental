CREATE TABLE vehicle_status(
  vehicle_status_code NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(vehicle_status_code)
);

CREATE TABLE vehicles(
  id INT NOT NULL AUTO_INCREMENT,
  registration NVARCHAR(20) NOT NULL,
  brand NVARCHAR(50) NOT NULL,
  model NVARCHAR(50) NOT NULL,
  daily_fee decimal(15,2) NOT NULL,
  location_id INT NOT NULL,
  best_offer TINYINT NOT NULL,
  vehicle_status_code NVARCHAR(3) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(vehicle_status_code) REFERENCES vehicle_status(vehicle_status_code),
  UNIQUE (registration)
);

CREATE TABLE vehicle_details(
  vehicle_id INT NOT NULL,
  body_type NVARCHAR(30) NOT NULL,
  production_year INT NOT NULL,
  fuel_type NVARCHAR(30) NOT NULL,
  power INT NOT NULL,
  gearbox NVARCHAR(30) NOT NULL,
  front_wheel_drive TINYINT NOT NULL,
  doors_number INT NOT NULL,
  seats_number INT NOT NULL,
  color NVARCHAR(30) NOT NULL,
  metallic TINYINT NOT NULL,
  photo_name NVARCHAR(70) NOT NULL,
  description NVARCHAR(100) NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id),
  UNIQUE (vehicle_id)
);

CREATE TABLE equipment(
  equipment_code NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(equipment_code)
);

CREATE TABLE eqp(
  vehicle_id INT NOT NULL,
  equipment_id NVARCHAR(3) NOT NULL,
  PRIMARY KEY(vehicle_id, equipment_id),
  FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
  FOREIGN KEY(equipment_id) REFERENCES equipment(equipment_code)
);