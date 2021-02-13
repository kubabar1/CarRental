DROP TABLE IF EXISTS AppUsersRoles;
DROP TABLE IF EXISTS UserRoles;
DROP TABLE IF EXISTS ChangesBookings;
DROP TABLE IF EXISTS VehicleParameters;
DROP TABLE IF EXISTS Stars;
DROP TABLE IF EXISTS Eqp;
DROP TABLE IF EXISTS Equipment;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS BookingStateCodes;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Vehicles;
DROP TABLE IF EXISTS VehicleStatus;
DROP TABLE IF EXISTS Locations;


CREATE TABLE Users(
  ID INT NOT NULL AUTO_INCREMENT,
  name NVARCHAR(40) NOT NULL,
  surname NVARCHAR(40) NOT NULL,
  login NVARCHAR(40) NOT NULL,
  password  NVARCHAR(100) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  birthDate DATE NOT NULL,
  pesel VARCHAR(15) NOT NULL,
  PRIMARY KEY(ID),
  UNIQUE(login),
  UNIQUE(email)
);

CREATE TABLE UserRoles(
   ID INT NOT NULL AUTO_INCREMENT,
   type VARCHAR(30) NOT NULL,
   PRIMARY KEY (id),
   UNIQUE (type)
);

CREATE TABLE AppUsersRoles (
    userID INT NOT NULL,
    userRoleID INT NOT NULL,
    PRIMARY KEY (userID, userRoleID),
    FOREIGN KEY (userID) REFERENCES Users(ID),
	FOREIGN KEY (userRoleID) REFERENCES UserRoles(ID)
);

CREATE TABLE Locations(
  ID INT NOT NULL AUTO_INCREMENT,
  country NVARCHAR(50) NOT NULL,
  city NVARCHAR(100) NOT NULL,
  addres NVARCHAR(100) NOT NULL,
  email NVARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  PRIMARY KEY(ID)
);

CREATE TABLE VehicleStatus(
  vehicleStatusCode NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(vehicleStatusCode)
);

CREATE TABLE Vehicles(
  ID INT NOT NULL AUTO_INCREMENT,
  registration NVARCHAR(20) NOT NULL,
  brand NVARCHAR(50) NOT NULL,
  model NVARCHAR(50) NOT NULL,
  dailyFee decimal(15,2) NOT NULL,
  locationID INT NOT NULL,
  vehicleStatus NVARCHAR(3) NOT NULL,
  bestOffer TINYINT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(locationID) REFERENCES Locations(ID),
  FOREIGN KEY(vehicleStatus) REFERENCES VehicleStatus(vehicleStatusCode),
  UNIQUE (registration)
);

CREATE TABLE VehicleParameters(
  vehicleID INT NOT NULL,
  bodyType NVARCHAR(30) NOT NULL,
  productionYear INT  NOT NULL,
  fuelType NVARCHAR(30) NOT NULL,
  power INT NOT NULL,
  gearbox NVARCHAR(30) NOT NULL,
  frontWheelDrive TINYINT NOT NULL,
  doorsNumber INT NOT NULL,
  seatsNumber INT NOT NULL,
  color NVARCHAR(30) NOT NULL,
  metallic TINYINT NOT NULL,
  photoName NVARCHAR(70) NOT NULL,
  description NVARCHAR(100) NOT NULL,
  FOREIGN KEY (vehicleID) REFERENCES Vehicles(ID),
  UNIQUE (vehicleID) 
);

CREATE TABLE Equipment(
  equipmentCode NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(equipmentCode)
);

CREATE TABLE Eqp(
  vehicleID INT NOT NULL,
  equipmentID NVARCHAR(3) NOT NULL,
  PRIMARY KEY(vehicleID, equipmentID),
  FOREIGN KEY(vehicleID) REFERENCES Vehicles(ID),
  FOREIGN KEY(equipmentID) REFERENCES Equipment(equipmentCode)
);

CREATE TABLE Comments(
  ID INT NOT NULL  AUTO_INCREMENT,
  vehicleID INT NOT NULL,
  commentContent TEXT NOT NULL ,
  login NVARCHAR(40) NOT NULL,
  creationDate DATETIME NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(vehicleID) REFERENCES Vehicles(ID),
  FOREIGN KEY(login) REFERENCES Users(login)
);

CREATE TABLE Stars(
  ID INT NOT NULL  AUTO_INCREMENT,
  vehicleID INT NOT NULL,
  stars INT NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(vehicleID) REFERENCES Vehicles(ID)
);

CREATE TABLE BookingStateCodes(
  bookingCode NVARCHAR(3) NOT NULL,
  description NVARCHAR(50) NOT NULL,
  PRIMARY KEY(bookingCode)
);

CREATE TABLE Bookings(
  ID INT NOT NULL  AUTO_INCREMENT,
  userID INT NOT NULL,
  vehicleID INT NOT NULL,
  receiptDate DATETIME NOT NULL,
  returnDate DATETIME NOT NULL,
  locationID INT NOT NULL,
  bookingStateCode NVARCHAR(3) NOT NULL,
  totalCost decimal(15,2) NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(userID) REFERENCES Users(ID),
  FOREIGN KEY(vehicleID) REFERENCES Vehicles(ID),
  FOREIGN KEY(locationID) REFERENCES Locations(ID),
  FOREIGN KEY(bookingStateCode) REFERENCES BookingStateCodes(bookingCode)
);

CREATE TABLE ChangesBookings(
  ID INT NOT NULL AUTO_INCREMENT,
  bookingID INT NOT NULL,
  changesDate DATETIME NOT NULL DEFAULT NOW(),  
  who NVARCHAR(100) NOT NULL, 
  PC NVARCHAR(100) NOT NULL,
  PRIMARY KEY(ID),
  FOREIGN KEY(bookingID) REFERENCES Bookings(ID)
);