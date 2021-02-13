DROP DATABASE IF  EXISTS carrental;
CREATE DATABASE carrental;

USE carrental;

SET NAMES 'utf8' COLLATE 'utf8_general_ci';
ALTER DATABASE carrental CHARACTER SET utf8 COLLATE utf8_general_ci;

SET NAMES 'utf8' COLLATE 'utf8_general_ci';


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
  description NVARCHAR(100) COLLATE utf8_unicode_ci NOT NULL,
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
  commentContent TEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL ,
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



DELIMITER //

DROP TRIGGER IF EXISTS bookingChangesStamp;
CREATE TRIGGER bookingChangesStamp
AFTER UPDATE ON Bookings
FOR each row
BEGIN
	INSERT INTO changesBookings (bookingID, who, PC) VALUES (OLD.ID, CURRENT_USER, @@hostname);
END
//

DROP TRIGGER IF EXISTS denyReservationUnavailableVehicle;
CREATE TRIGGER denyReservationUnavailableVehicle
BEFORE INSERT ON Bookings
FOR each row
BEGIN
	DECLARE vehicleState NVARCHAR(3);
	
	SELECT vehicleStatus INTO vehicleState FROM Vehicles WHERE ID=new.vehicleID;
	

	IF(vehicleState='UAV') 
	THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot reserve unavailable vehicle';
	END IF;
END
//	

DROP TRIGGER IF EXISTS denyDeletingBooking;
CREATE TRIGGER denyDeletingBooking
BEFORE DELETE ON Bookings
FOR each row
BEGIN
	SIGNAL SQLSTATE '45000'  SET MESSAGE_TEXT = 'Cannot delete booking';
END
//	



DELIMITER ;



INSERT INTO UserRoles VALUES (1,'ADMIN'),(5,'BLOGGER'),(2,'CUSTOMER'),(3,'OFFICEEMPLOYEE'),(4,'RENTINGEMPLOYEE');

INSERT INTO Users VALUES (1,'Rooney','Huff','Oliver','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','lobortis@velnisl.net','(0181) 760 8925','2018-10-25','1672121883899'),(2,'Eagan','Foley','Unity','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ullamcorper.viverra@accumsan.edu','0966 824 6434','2019-01-29','1642111466999'),(3,'Owen','Gamble','Quincy','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','volutpat.Nulla.facilisis@Crasloremlorem.edu','(0117) 074 0154','2017-08-17','1637090714599'),(4,'Hanae','Hoover','Levi','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Ut@purus.co.uk','(01758) 79978','2018-08-31','1645012143499'),(5,'Judith','Love','Cullen','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Quisque@Fusce.com','(0115) 579 9066','2019-07-07','1604021449699'),(6,'Zelenia','Sullivan','Vaughan','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','In.lorem@amet.edu','0388 513 4393','2019-03-31','1696112184199'),(7,'Edan','Sanford','Hunter','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','tincidunt.tempus.risus@enimmitempor.ca','0800 1111','2018-01-07','1695032916699'),(8,'Nicole','Guthrie','Zephania','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','a@auctorveliteget.ca','055 6381 3457','2018-03-24','1692031344799'),(9,'Jack','Sweet','Chadwick','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Donec@Morbi.co.uk','07624 011266','2018-01-14','1631031047099'),(10,'Idona','Abbott','Sonya','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','vehicula.risus@Nullamscelerisque.com','055 4978 9916','2018-06-08','1662032748799'),(11,'Sonia','Burns','Amir','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','turpis.vitae@aliquet.co.uk','07624 450363','2017-08-07','1683032515399'),(12,'Price','Lambert','Laura','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','arcu.Nunc.mauris@temporbibendum.ca','(01689) 67982','2019-05-16','1656092550099'),(13,'Jocelyn','Mcclure','Aurelia','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','lacinia@uteros.com','055 4722 2827','2018-03-12','1671072736199'),(14,'Perry','Hunter','Barclay','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','euismod.urna@rhoncusProin.net','07889 396537','2019-06-17','1624102921399'),(15,'Buckminster','Hopper','Lunea','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','quis.lectus.Nullam@Suspendisse.ca','0340 034 5581','2017-10-02','1625072522699'),(16,'Kim','Mcleod','Dana','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','purus@est.org','0800 1111','2019-04-20','1682110640699'),(17,'Yael','Ray','Shana','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','turpis@urna.net','0845 46 44','2019-06-16','1681040884499'),(18,'Philip','Knox','Kellie','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','libero@id.ca','070 5239 4613','2019-05-09','1621022234999'),(19,'Odessa','Gilmore','Thane','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Vivamus.nibh.dolor@disparturient.net','0845 46 47','2018-07-24','1633020884999'),(20,'Nadine','Bonner','Robert','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Sed.id@hendreritid.net','076 1207 3325','2019-03-01','1627022833999'),(21,'Fay','Copeland','Quinlan','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Phasellus.dolor.elit@sedpedenec.co.uk','056 1780 5238','2019-05-03','1620020984599'),(22,'Dacey','Benton','Latifah','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','quis.massa@risusquis.edu','070 8907 2549','2018-07-08','1675101522399'),(23,'Orli','Yang','Wing','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','fringilla@iaculisenimsit.net','(0111) 930 7255','2018-04-25','1680092571999'),(24,'Uriel','Roy','Ross','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','dui.nec@posuere.net','076 0896 3655','2018-10-23','1668062544599'),(25,'Zoe','Webb','MacKenzie','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','vitae.risus@sedorcilobortis.org','070 1736 7302','2017-09-14','1626102956399'),(26,'Ivan','Carr','Jaime','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','amet.faucibus.ut@sed.edu','0800 147626','2018-05-03','1607092475799'),(27,'Carol','Hansen','Roth','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Quisque@nec.ca','(01676) 61169','2019-06-14','1600011298199'),(28,'Willa','Mathews','Iliana','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sem.consequat@Phasellusin.edu','0500 450288','2019-06-15','1602021290499'),(29,'Alyssa','Hancock','Michelle','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ut@maurissagittisplacerat.org','0923 326 8855','2019-04-12','1690040955999'),(30,'Shea','Joyner','Rana','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','tincidunt.Donec.vitae@arcuMorbi.co.uk','(015457) 51559','2018-11-10','1649011424799'),(31,'Malik','Dean','Cameron','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Vestibulum.ut.eros@sollicitudinadipiscingligula.org','(0117) 710 1999','2018-08-09','1698080656499'),(32,'Evelyn','Valentine','Hilda','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sit@elit.ca','056 6237 7242','2018-10-04','1659090692299'),(33,'Medge','Maxwell','Kadeem','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','libero.Donec.consectetuer@liberoat.net','07624 048463','2017-10-08','1686092145799'),(34,'Ayanna','Lopez','Jakeem','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','feugiat.metus.sit@ornareplaceratorci.ca','076 0403 3372','2018-01-04','1669011588399'),(35,'Caldwell','Shaw','Noelani','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','fermentum.fermentum.arcu@egetmassa.net','055 6428 7074','2017-12-31','1664022132399'),(36,'Sasha','Carrillo','Graiden','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ornare.In.faucibus@sollicitudincommodoipsum.edu','0956 978 9982','2018-08-03','1618042225899'),(37,'Gage','Holmes','Colton','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Sed.auctor.odio@malesuadafames.ca','07624 567001','2018-06-03','1620051211099'),(38,'Hayley','Duran','Halee','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sapien.imperdiet@Nuncmaurissapien.edu','(01033) 87883','2017-11-08','1682092514499'),(39,'Grady','Branch','Eric','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','consectetuer.adipiscing@habitantmorbitristique.net','07263 179117','2019-06-28','1673092213299'),(40,'Claire','Welch','Martin','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','turpis.non@tellusimperdietnon.ca','07435 203505','2019-01-24','1603071899599'),(41,'Dale','Francis','Odysseus','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','nec.mollis.vitae@risus.org','0386 184 2753','2017-08-20','1663101490599'),(42,'Derek','Moreno','Andrew','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Ut.sagittis@facilisisvitae.edu','0845 46 41','2018-11-23','1657040617299'),(43,'Ila','Hardy','Maisie','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sociis@ametconsectetueradipiscing.com','0800 1111','2019-05-21','1601032745399'),(44,'Madeson','Logan','Forrest','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','quis.urna.Nunc@venenatisamagna.ca','(0121) 135 5048','2018-01-18','1662111360799'),(45,'Cadman','Barron','Dana2','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','quis@acmattis.com','07624 447860','2018-07-26','1624070818399'),(46,'Petra','Cameron','Kibo','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','In@sem.ca','0500 427723','2017-08-03','1661061160999'),(47,'Zelda','Cook','Moana','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','risus@justonec.org','07706 566026','2017-09-10','1615040384599'),(48,'Julian','Nixon','Nash','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','in.cursus@Phasellus.net','0800 358 0552','2018-06-21','1624121245499'),(49,'Hiroko','Ellison','Ina','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Duis@ultrices.co.uk','0800 1111','2018-06-29','1651120850799'),(50,'Frances','Whitaker','Aurelia2','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','et@lacusEtiam.edu','07624 840321','2018-06-29','1671031309699'),(51,'Gabriel','Sears','Donna','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','augue.malesuada@Sed.edu','0800 100311','2017-08-11','1646120451699'),(52,'Zeus','Williamson','Price','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sed.dui@vitaeposuereat.org','0800 896720','2019-06-06','1637062838999'),(53,'Isaac','Mcgee','Gloria','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','habitant.morbi.tristique@in.edu','(016977) 5962','2018-03-31','1673121892899'),(54,'Harding','Forbes','Melinda','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','egestas.Aliquam.nec@vestibulummassa.org','(01121) 91703','2018-06-04','1626070212999'),(55,'Aladdin','Michael','Bree','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','dui.Suspendisse@orciquislectus.com','(016348) 58082','2019-02-22','1644020320399'),(56,'Talon','Franco','Acton','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','tellus.justo.sit@aliquamarcu.edu','076 9559 6674','2018-11-06','1609040818799'),(57,'Aspen','Kirkland','Portia','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','rhoncus@Sednecmetus.net','0800 410883','2017-12-30','1608020164099'),(58,'Tatiana','Cain','Hedy','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sed.sapien.Nunc@etrutrum.net','(0181) 525 1628','2017-10-24','1692100481399'),(59,'Patience','Adams','Rowan','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','adipiscing.lacus@risusNunc.org','0865 869 0980','2019-01-07','1602101434299'),(60,'Abdul','Cardenas','Jasmine','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ipsum.leo.elementum@urna.org','055 1682 3878','2017-09-25','1608051815099'),(61,'Yetta','Yates','Linda','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','odio.Etiam@ut.com','(0118) 350 3171','2018-01-14','1608072318099'),(62,'Kerry','Jennings','Bertha','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Nulla.tincidunt@turpis.edu','0929 828 0552','2018-11-16','1622042753899'),(63,'Alfonso','Terrell','Sigourney','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','eu@Aeneanmassa.com','0800 643965','2019-06-24','1628072090499'),(64,'Dennis','Mercer','Kessie','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','egestas@ullamcorperDuiscursus.net','(0118) 419 7563','2017-12-04','1658080253099'),(65,'Christopher','Irwin','Hayes','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','molestie@infaucibusorci.edu','(0141) 607 0265','2019-05-23','1616030583399'),(66,'Denton','Hoffman','Myra','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ut@nulla.org','(0111) 169 8659','2019-04-30','1617062658799'),(67,'Maryam','Mccormick','Murphy','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sed.dolor.Fusce@Nullasempertellus.ca','0800 693510','2019-03-07','1658112793499'),(68,'Gillian','Crosby','Mia','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','cursus.a.enim@Fuscefermentum.co.uk','(016977) 4709','2019-07-21','1689071655799'),(69,'Steven','Oconnor','Chaim','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','arcu.Aliquam.ultrices@mattis.net','055 0892 0915','2017-10-08','1680112410199'),(70,'Brielle','Mercer','Hedley','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','orci.Phasellus.dapibus@vestibulum.com','0993 588 9491','2018-04-21','1634032843099'),(71,'Quail','Thomas','Aaron','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','non@famesacturpis.org','0845 46 42','2018-12-06','1660050154999'),(72,'Anjolie','Fry','Quemby','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','malesuada.fames.ac@loremacrisus.co.uk','0847 947 6671','2019-05-29','1661021505699'),(73,'Rinah','Price','Destiny','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','at.velit@aliquam.ca','(027) 6030 7997','2018-12-21','1653100493199'),(74,'Sonia','Sloan','Willow','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','quam.a.felis@ipsumdolorsit.edu','0800 013 7423','2018-02-25','1619070378399'),(75,'Cullen','Richards','Medge','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Cras.convallis@lobortis.org','070 7010 7025','2019-04-26','1622061671799'),(76,'Dexter','Love','Jacqueline','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','est.Nunc.ullamcorper@acsemut.edu','0398 901 4779','2018-04-19','1632041222099'),(77,'Kiona','Solis','Kermit','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','ut@Duisac.org','(017320) 38228','2018-09-26','1603121909499'),(78,'Kimberley','Johnson','Isabella','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sociis@ornarelectusjusto.ca','(0161) 388 4976','2017-11-14','1692042157999'),(79,'Teegan','Preston','Avye','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Nullam@nonsollicitudina.edu','(0141) 554 8918','2019-05-17','1681082503299'),(80,'Cameron','Petersen','Garth','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','imperdiet@elitdictum.edu','(01208) 27175','2018-09-01','1673031920999'),(81,'Kiayada','Webster','Preston','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','aliquam@nasceturridiculusmus.net','(01759) 93116','2018-10-16','1661112380699'),(82,'Reese','Russell','Kibo2','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','eget.ipsum@orciquislectus.ca','0882 047 9768','2018-07-02','1641032122499'),(83,'Bevis','Lawson','Lynn','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','egestas@Morbiquisurna.ca','07743 817931','2019-07-10','1650052372599'),(84,'Chancellor','Mccarthy','Carter','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','nunc.risus.varius@elit.net','(0141) 364 9558','2019-01-19','1610050262799'),(85,'Rina','Rivers','Ann','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Vestibulum.ut.eros@Aliquam.org','07154 945357','2019-07-16','1647092246799'),(86,'Michael','Carney','Aphrodite','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sit.amet@risusInmi.edu','0800 703831','2019-01-25','1611021686099'),(87,'Igor','Gillespie','Kennan','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sapien@felispurusac.org','07624 657732','2018-04-22','1694022741399'),(88,'Theodore','Barker','Wade','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','tristique@ullamcorper.org','(016977) 6867','2017-12-10','1676112342199'),(89,'Hadassah','Cochran','Xerxes','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','Aenean.massa.Integer@purussapiengravida.ca','07624 228855','2018-05-10','1632082997299'),(90,'Fleur','Farley','Ethan','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','dapibus.ligula.Aliquam@risusatfringilla.org','(012656) 17504','2018-08-29','1604120285399'),(91,'Hilel','Bernard','Gage','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','odio@magna.edu','(0181) 589 6122','2018-10-30','1669031059699'),(92,'Benjamin','Summers','Angela','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','auctor.odio.a@nisiAeneaneget.co.uk','0845 46 45','2017-10-01','1671081017699'),(93,'Ivana','Harper','Destiny2','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','dictum.Phasellus@pedePraesent.ca','0845 46 46','2018-06-29','1635123026799'),(94,'Aquila','Gates','Boris','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','varius.ultrices.mauris@porttitor.co.uk','0900 993 0002','2018-07-08','1623102963299'),(95,'Logan','Sears','Giacomo','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','odio.tristique.pharetra@vehicula.net','(0110) 222 7469','2019-03-23','1648100363299'),(96,'Maisie','Walsh','Deacon','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','elit@vitaesodales.net','0816 257 3221','2017-08-01','1657120515499'),(97,'Orli','Sosa','Shaeleigh','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','sed.pede@Curabiturmassa.net','070 7970 9639','2019-01-15','1609092709599'),(98,'Demetria','Gonzalez','Daniel','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','molestie.tellus.Aenean@Pellentesqueultricies.edu','(01004) 062095','2017-10-07','1692082737999'),(99,'Odette','Manning','Lydia','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','lectus.pede@sociisnatoque.ca','0348 069 7118','2018-07-12','1658032153099'),(100,'Kennan','Blanchard','Karina','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','lorem.sit@massa.ca','(0112) 899 2379','2018-12-09','1686032740699'),(101,'Adam','Tomkowski','adam123','$2a$10$UbB2jVomiiCQMbSSO2dn.Oi5pgxM9ydh3O4nn5Wj2Rc48GBrAbmg2','adam.kowalski1@interia.pl','123 456 321','1996-02-10','96021112345'),(102,'Marek','Adamowski','marek123','$2a$10$pJyncdXvc60ySfcFD9FF0OswMVWpEAN5qdiRvhFvjfsSyMDychCQy','marek@gmail.com','123 321 222','1995-01-01','95010212321'),(103,'Karol','Nowakowski','karol123','$2a$10$68MN/PUjqXoAe5WnBls04.oW/V1IO1ZKKcqsaAJC5x7XkxGPOm6n2','karol.nowakowski@gmail.com','312 311 123','1992-06-17','92061712211');

INSERT INTO AppUsersRoles VALUES (1,2),(2,2),(3,2),(4,2),(5,2),(6,2),(7,2),(8,2),(9,2),(10,2),(11,2),(12,2),(13,2),(14,2),(15,2),(16,2),(17,2),(18,2),(19,2),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(26,2),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(33,2),(34,2),(35,2),(36,2),(37,2),(38,2),(39,2),(40,2),(41,4),(42,4),(43,4),(44,4),(45,4),(46,4),(47,4),(48,4),(49,4),(50,4),(51,5),(52,5),(53,5),(54,5),(55,5),(56,3),(57,3),(58,3),(59,3),(60,3),(61,3),(62,3),(63,3),(64,3),(65,3),(66,3),(67,3),(68,3),(69,3),(70,3),(71,2),(72,2),(73,2),(74,2),(75,2),(76,2),(77,2),(78,2),(79,2),(80,2),(81,2),(82,2),(83,2),(84,2),(85,2),(86,2),(87,2),(88,2),(89,2),(90,2),(91,2),(92,2),(93,2),(94,2),(95,2),(96,1),(97,1),(98,1),(99,1),(100,1),(101,2),(102,2),(102,3),(103,1),(103,2);

INSERT INTO BookingStateCodes VALUES ('CAN','canceled'),('REN','rented'),('RES','reserved'),('RET','returned');

INSERT INTO Equipment VALUES ('ABS','ABS'),('AF','Alufelgi'),('APS','Podgrzewane przednie siedzenia'),('CB','CB Radio'),('CD','CD'),('CZ','Centralny zamek'),('ESP','Elektryczne przednie szyby'),('EUL','Elektrycznie ustawiane lusterka'),('IM','Immobilizer'),('KM','Klimatyzacja manualna'),('PPK','Poduszka powietrzna kierowcy'),('RD','Radio'),('SP','Światła przeciwmgielne'),('WK','Wspomaganie kierownicy');

INSERT INTO VehicleStatus VALUES ('AVI','available'),('UAV','unavailable');

INSERT INTO Locations VALUES (1,'Polska','Warszawa','Poznańska 21','nulla.Integer@Integereu.co.uk','(0112) 886 4792'),(2,'Polska','Wrocław','Krakowska 12a','tortor.nibh@habitant.net','(013649) 34844'),(3,'Polska','Lublin','Kraszewskiego 52','Duis.dignissim.tempor@lectusconvallisest.ca','0800 053513'),(4,'Polska','Poznań','Warszawska 3','Mauris.nulla@congueIn.com','0500 994031'),(5,'Polska','Kraków','Narutowicza 4','Nulla.facilisis@acsem.org','0986 900 4908'),(6,'Polska','Gdańsk','Akademicka 31','adipiscing@velitegestaslacinia.edu','(01172) 32464'),(7,'Polska','Białystok','Filtrowa 4','iaculis.enim@velpede.edu','0912 969 9359'),(8,'Polska','Toruń','Podlaska 21','est@Aenean.org','(01049) 44640'),(9,'Polska','Rzeszów','Morska 3','sit@elitCurabitur.edu','(0116) 513 7163'),(10,'Polska','Gdynia','Krakowska 21','Nunc.sollicitudin.commodo@lorem.co.uk','(01088) 483666');

INSERT INTO Vehicles VALUES (1,'AB 12321','Alfa Romeo','4C',183.04,1,'AVI',1),(2,'BC 57843','Audi','R8',124.95,2,'AVI',0),(3,'SD 85678','Audi','Q5',153.88,3,'AVI',0),(4,'QW 32456','Audi','S5',176.41,4,'AVI',0),(5,'RE 54343','Audi','A3',109.38,5,'AVI',1),(6,'WE 54545','Audi','80',193.67,6,'AVI',0),(7,'WY 65656','BMW','I8',200.80,7,'AVI',0),(8,'AB 74535','BMW','X1',144.43,8,'AVI',0),(9,'AS 75675','BMW','M5',165.06,9,'AVI',0),(10,'QW 34546','BMW','M6',169.25,10,'AVI',0),(11,'EW 75674','Citroen','C4 Cactus',163.55,1,'AVI',0),(12,'FD 34567','Citroen','Jumpy',192.15,2,'AVI',0),(13,'SD 64626','Citroen','Xsara Picasso',206.25,3,'AVI',0),(14,'FD 55678','Dacia','Duster',153.09,4,'AVI',0),(15,'QW 77654','Dacia','Logan',164.67,5,'AVI',0),(16,'EW 37658','Fiat','Panda',201.32,6,'AVI',0),(17,'FD 46544','Fiat','500',219.85,7,'AVI',0),(18,'SD 34435','Ford','Mustang',212.32,8,'AVI',0),(19,'AS 55454','Ford','Fiesta',226.59,9,'AVI',0),(20,'QW 34343','Ford','Crown Victoria',178.54,10,'AVI',1),(21,'EW 55445','Ford','Transit',219.45,1,'AVI',0),(22,'FD 44554','Ford','Escape',215.58,2,'AVI',0),(23,'AB 35434','Honda','Accord',187.30,3,'AVI',0),(24,'AS 24343','Honda','CR-V',245.97,4,'AVI',0),(25,'QW 62245','Hyundai','Genesis',208.25,5,'AVI',0),(26,'EW 5345','Hyundai','i30',129.88,6,'AVI',0),(27,'FD 65456','Hyundai','Santa Fe',230.71,7,'AVI',0),(28,'VA 75657','Jeep','Cherokee',200.59,8,'AVI',0),(29,'AB 45654','Jeep','Renegade',142.29,9,'AVI',0),(30,'DS 12321','Jeep','Wrangler',180.11,10,'AVI',0),(31,'VC 46567','Lexus','ES',203.13,1,'AVI',0),(32,'SD 12321','Lexus','IS',168.99,2,'AVI',1),(33,'AB 45656','Mercedes-Benz','AMG-GT',230.97,3,'AVI',0),(34,'WW 56756','Mercedes-Benz','G Class',149.63,4,'AVI',0),(35,'AB 164781','Mitsubishi','Outlander',196.20,5,'AVI',0),(36,'AD 35454','Mitsubishi','ASX',109.81,6,'AVI',1),(37,'AB 65645','Nissan','GTR',147.53,7,'AVI',0),(38,'AB 34545','Nissan','Juke',177.96,8,'AVI',0),(39,'AB 65445','Opel','Corsa',200.71,9,'AVI',0),(40,'DD 12321','Opel','Vectra',201.30,10,'AVI',0),(41,'AB 65656','Opel','Astra',180.94,1,'AVI',0),(42,'DS  12321','Porshe','911',180.62,2,'AVI',0),(43,'QW 64565','Porshe','Panamera',122.81,3,'AVI',0),(44,'RE  12321','Porshe','Cayenne',127.15,4,'AVI',0),(45,'WU 54545','Subaru','Impreza',123.65,5,'AVI',0),(46,'WI 12321','Volkswagen','Passat',243.33,6,'AVI',0),(47,'AB  34545','Volkswagen','Polo',213.35,7,'AVI',0),(48,'AS  12321','Volkswagen','Golf',122.42,8,'AVI',1),(49,'QW 64365','Volvo','V40',199.37,9,'AVI',0),(50,'EW 75675','Volvo','XC90',226.59,10,'AVI',0),(51,'ZZ 21243s','Ferrari','Enzo',255.22,5,'AVI',0),(52,'AS 2121as','Ferrari','California',225.22,5,'AVI',0);

INSERT INTO Eqp VALUES (1,'AF'),(1,'CB'),(1,'CD'),(1,'CZ'),(1,'ESP'),(1,'EUL'),(1,'PPK'),(1,'SP'),(1,'WK'),(2,'ABS'),(2,'APS'),(2,'CB'),(2,'CD'),(2,'CZ'),(2,'ESP'),(2,'EUL'),(2,'KM'),(2,'RD'),(3,'ABS'),(3,'AF'),(3,'APS'),(3,'CB'),(3,'CD'),(3,'KM'),(3,'PPK'),(3,'RD'),(3,'SP'),(4,'AF'),(4,'CB'),(4,'CD'),(4,'ESP'),(4,'KM'),(4,'PPK'),(4,'RD'),(4,'SP'),(4,'WK'),(5,'ABS'),(5,'AF'),(5,'CB'),(5,'CD'),(5,'CZ'),(5,'ESP'),(5,'EUL'),(5,'KM'),(5,'RD'),(5,'SP'),(5,'WK'),(6,'ABS'),(6,'AF'),(6,'CB'),(6,'CZ'),(6,'ESP'),(6,'EUL'),(6,'PPK'),(6,'WK'),(7,'APS'),(7,'CB'),(7,'CD'),(7,'CZ'),(7,'KM'),(7,'PPK'),(7,'RD'),(7,'SP'),(7,'WK'),(8,'ABS'),(8,'CB'),(8,'CD'),(8,'EUL'),(8,'KM'),(8,'PPK'),(8,'RD'),(8,'SP'),(8,'WK'),(9,'AF'),(9,'APS'),(9,'CB'),(9,'ESP'),(9,'EUL'),(9,'KM'),(9,'SP'),(9,'WK'),(10,'AF'),(10,'APS'),(10,'CB'),(10,'CD'),(10,'ESP'),(10,'EUL'),(10,'SP'),(10,'WK'),(11,'ABS'),(11,'AF'),(11,'CB'),(11,'CD'),(11,'CZ'),(11,'ESP'),(11,'EUL'),(11,'KM'),(11,'PPK'),(11,'WK'),(12,'ABS'),(12,'AF'),(12,'APS'),(12,'CZ'),(12,'ESP'),(12,'EUL'),(12,'KM'),(12,'WK'),(13,'ABS'),(13,'AF'),(13,'CB'),(13,'CD'),(13,'CZ'),(13,'EUL'),(13,'KM'),(13,'PPK'),(13,'SP'),(13,'WK'),(14,'AF'),(14,'CB'),(14,'CD'),(14,'CZ'),(14,'ESP'),(14,'EUL'),(14,'KM'),(14,'RD'),(14,'WK'),(15,'AF'),(15,'CB'),(15,'CD'),(15,'ESP'),(15,'EUL'),(15,'KM'),(15,'RD'),(15,'WK'),(16,'ABS'),(16,'APS'),(16,'CB'),(16,'CD'),(16,'CZ'),(16,'ESP'),(16,'EUL'),(16,'PPK'),(17,'ABS'),(17,'AF'),(17,'APS'),(17,'CB'),(17,'CD'),(17,'KM'),(17,'PPK'),(17,'RD'),(17,'SP'),(17,'WK'),(18,'ABS'),(18,'APS'),(18,'CD'),(18,'KM'),(18,'PPK'),(18,'RD'),(18,'SP'),(18,'WK'),(19,'APS'),(19,'CD'),(19,'CZ'),(19,'EUL'),(19,'KM'),(19,'PPK'),(19,'RD'),(19,'SP'),(19,'WK'),(20,'ABS'),(20,'APS'),(20,'CB'),(20,'CD'),(20,'CZ'),(20,'ESP'),(20,'KM'),(20,'RD'),(20,'SP'),(20,'WK'),(21,'APS'),(21,'CB'),(21,'CD'),(21,'CZ'),(21,'ESP'),(21,'EUL'),(21,'RD'),(21,'SP'),(22,'APS'),(22,'CB'),(22,'CD'),(22,'EUL'),(22,'KM'),(22,'PPK'),(22,'RD'),(22,'SP'),(22,'WK'),(23,'ABS'),(23,'AF'),(23,'APS'),(23,'CB'),(23,'CD'),(23,'CZ'),(23,'KM'),(23,'PPK'),(23,'RD'),(24,'APS'),(24,'CB'),(24,'CD'),(24,'CZ'),(24,'ESP'),(24,'EUL'),(24,'RD'),(24,'SP'),(24,'WK'),(25,'ABS'),(25,'APS'),(25,'CB'),(25,'CD'),(25,'KM'),(25,'RD'),(25,'SP'),(25,'WK'),(26,'AF'),(26,'CB'),(26,'CD'),(26,'CZ'),(26,'ESP'),(26,'EUL'),(26,'PPK'),(26,'SP'),(26,'WK'),(27,'APS'),(27,'CB'),(27,'CD'),(27,'ESP'),(27,'EUL'),(27,'KM'),(27,'SP'),(27,'WK'),(28,'AF'),(28,'CB'),(28,'CD'),(28,'ESP'),(28,'EUL'),(28,'KM'),(28,'PPK'),(28,'WK'),(29,'ABS'),(29,'AF'),(29,'APS'),(29,'CB'),(29,'ESP'),(29,'EUL'),(29,'PPK'),(29,'SP'),(30,'ABS'),(30,'AF'),(30,'CB'),(30,'CD'),(30,'ESP'),(30,'KM'),(30,'RD'),(30,'SP'),(31,'ABS'),(31,'APS'),(31,'CD'),(31,'ESP'),(31,'EUL'),(31,'KM'),(31,'PPK'),(31,'SP'),(32,'ABS'),(32,'AF'),(32,'CD'),(32,'ESP'),(32,'EUL'),(32,'PPK'),(32,'RD'),(32,'SP'),(32,'WK'),(33,'ABS'),(33,'AF'),(33,'CB'),(33,'CD'),(33,'ESP'),(33,'PPK'),(33,'RD'),(33,'SP'),(33,'WK'),(34,'ABS'),(34,'AF'),(34,'CB'),(34,'EUL'),(34,'KM'),(34,'PPK'),(34,'RD'),(34,'SP'),(35,'ABS'),(35,'AF'),(35,'CB'),(35,'CD'),(35,'CZ'),(35,'ESP'),(35,'EUL'),(35,'PPK'),(35,'SP'),(36,'AF'),(36,'CZ'),(36,'ESP'),(36,'EUL'),(36,'KM'),(36,'PPK'),(36,'RD'),(36,'SP'),(36,'WK'),(37,'ABS'),(37,'AF'),(37,'APS'),(37,'CB'),(37,'CZ'),(37,'ESP'),(37,'RD'),(37,'SP'),(37,'WK'),(38,'AF'),(38,'CB'),(38,'CD'),(38,'CZ'),(38,'ESP'),(38,'EUL'),(38,'PPK'),(38,'RD'),(38,'SP'),(39,'ABS'),(39,'AF'),(39,'APS'),(39,'CB'),(39,'CD'),(39,'CZ'),(39,'KM'),(39,'PPK'),(39,'SP'),(39,'WK'),(40,'ABS'),(40,'AF'),(40,'CB'),(40,'CZ'),(40,'ESP'),(40,'PPK'),(40,'RD'),(40,'WK'),(41,'ABS'),(41,'AF'),(41,'APS'),(41,'CB'),(41,'CD'),(41,'ESP'),(41,'EUL'),(41,'KM'),(41,'PPK'),(42,'ABS'),(42,'AF'),(42,'APS'),(42,'CB'),(42,'CZ'),(42,'ESP'),(42,'EUL'),(42,'PPK'),(42,'SP'),(43,'ABS'),(43,'AF'),(43,'APS'),(43,'CB'),(43,'CD'),(43,'ESP'),(43,'KM'),(43,'PPK'),(43,'RD'),(44,'APS'),(44,'CB'),(44,'CD'),(44,'CZ'),(44,'ESP'),(44,'EUL'),(44,'PPK'),(44,'SP'),(44,'WK'),(45,'AF'),(45,'CB'),(45,'CD'),(45,'ESP'),(45,'EUL'),(45,'KM'),(45,'PPK'),(45,'RD'),(45,'SP'),(45,'WK'),(46,'AF'),(46,'APS'),(46,'CB'),(46,'CD'),(46,'CZ'),(46,'ESP'),(46,'KM'),(46,'SP'),(47,'ABS'),(47,'AF'),(47,'APS'),(47,'CB'),(47,'CZ'),(47,'ESP'),(47,'EUL'),(47,'KM'),(47,'PPK'),(47,'WK'),(48,'ABS'),(48,'AF'),(48,'CZ'),(48,'ESP'),(48,'EUL'),(48,'KM'),(48,'PPK'),(48,'SP'),(48,'WK'),(49,'ABS'),(49,'AF'),(49,'CB'),(49,'CD'),(49,'CZ'),(49,'ESP'),(49,'KM'),(49,'PPK'),(49,'RD'),(49,'SP'),(50,'AF'),(50,'APS'),(50,'CB'),(50,'ESP'),(50,'EUL'),(50,'IM'),(50,'KM'),(50,'RD'),(50,'WK'),(51,'ABS'),(51,'APS'),(51,'CB'),(51,'CD'),(51,'CZ'),(51,'ESP'),(51,'EUL'),(51,'IM'),(51,'KM'),(51,'PPK'),(51,'RD'),(51,'SP'),(51,'WK'),(52,'ABS'),(52,'AF'),(52,'APS'),(52,'CB'),(52,'CZ'),(52,'ESP'),(52,'EUL'),(52,'IM'),(52,'KM'),(52,'PPK'),(52,'RD'),(52,'WK');

INSERT INTO VehicleParameters VALUES (1,'Coupe',2017,'LPG',240,'auto',0,2,2,'Red',1,'1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(2,'Coupe',2014,'Petrol',500,'man',0,2,2,'White',1,'2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(3,'SUV',2008,'LPG',240,'man',1,4,5,'Red',1,'3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(4,'Sedan',2016,'Petrol',340,'auto',1,4,5,'Black',1,'4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(5,'Kombi',2012,'Petrol',200,'man',0,3,5,'Blue',1,'5.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(6,'Kombi',2011,'LPG',100,'auto',1,5,5,'Black',1,'6.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(7,'Coupe',2014,'Petrol',231,'auto',0,2,2,'Grey',1,'7.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(8,'SUV',2016,'LPG',240,'man',1,4,5,'White',1,'8.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(9,'Coupe',2013,'Petrol',400,'auto',1,4,5,'Blue',1,'9.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(10,'Coupe',2014,'Petrol',560,'auto',1,4,5,'Black',1,'10.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(11,'SUV',2016,'Petrol',80,'auto',0,4,5,'White',1,'11.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(12,'Van',2013,'Petrol',115,'man',0,3,2,'Red',1,'12.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(13,'Minivan',2012,'LPG',105,'man',0,5,5,'Beige',0,'13.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus'),(14,'SUV',2017,'LPG',95,'man',1,2,2,'Black',1,'14.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(15,'Sedan',2015,'Petrol',80,'auto',1,2,2,'Brown',1,'15.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(16,'Hatchback',2017,'Petrol',85,'man',0,2,2,'Red',1,'16.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(17,'Hatchback',2017,'LPG',75,'auto',0,2,2,'White',1,'17.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(18,'Coupe',2016,'Petrol',350,'man',1,2,2,'Orange',1,'18.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(19,'Hatchback',2003,'LPG',100,'auto',1,2,5,'Grey',1,'19.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(20,'Sedan',2005,'Petrol',200,'auto',1,4,5,'White',0,'20.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(21,'Van',2017,'LPG',120,'man',1,5,2,'Grey',1,'21.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(22,'SUV',2013,'Petrol',150,'auto',1,5,5,'Blue',1,'22.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(23,'Coupe',2005,'Petrol',200,'man',0,5,4,'Claret',0,'23.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(24,'SUV',2006,'LPG',140,'auto',0,5,4,'Grey',1,'24.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(25,'Coupe',2011,'Petrol',315,'auto',0,4,4,'Black',1,'25.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(26,'Kombi',2013,'Petrol',100,'man',1,5,5,'Blue',1,'26.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(27,'SUV',2015,'LPG',160,'man',0,5,5,'Grey',1,'27.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(28,'SUV',2017,'Petrol',220,'man',0,5,5,'Black',1,'28.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(29,'SUV',2016,'Petrol',130,'man',1,5,5,'Black',1,'29.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(30,'SUV',2017,'Petrol',200,'man',0,5,5,'Beige',1,'30.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(31,'Sedan',2013,'Petrol',272,'auto',0,5,5,'Red',1,'31.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(32,'Sedan',2017,'LPG',290,'man',1,4,5,'Red',1,'32.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(33,'Coupe',2015,'LPG',500,'auto',1,2,2,'Grey',1,'33.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(34,'Sedan',2016,'Petrol',200,'man',0,5,5,'Black',1,'34.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(35,'SUV',2017,'LPG',145,'auto',0,5,5,'Claret',1,'35.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(36,'SUV',2018,'Petrol',120,'man',1,5,5,'Red',1,'36.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(37,'Coupe',2017,'Petrol',500,'auto',0,2,2,'White',1,'37.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(38,'SUV',2018,'LPG',120,'man',1,3,5,'Black',1,'38.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(39,'Hatchback',2015,'Petrol',90,'man',0,5,5,'Red',0,'39.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(40,'Sedan',2014,'LPG',150,'auto',1,5,5,'Grey',0,'40.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(41,'Kombi',2015,'LPG',130,'man',0,5,5,'Red',0,'41.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(42,'Coupe',2014,'Petrol',411,'auto',0,2,2,'White',1,'42.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(43,'Coupe',2013,'Petrol',300,'auto',1,4,5,'Black',1,'43.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(44,'SUV',2012,'Petrol',290,'auto',1,5,5,'Black',1,'44.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(45,'Coupe',2011,'Petrol',250,'auto',1,5,5,'Blue',1,'45.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(46,'Sedan',2014,'Petrol',150,'auto',0,5,5,'White',1,'46.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(47,'Hatchback',2015,'LPG',90,'man',0,5,5,'White',1,'47.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(48,'Hatchback',2016,'Petrol',125,'man',1,5,5,'Black',1,'48.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(49,'SUV',2017,'Petrol',160,'auto',0,5,5,'Brown',1,'49.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(50,'SUV',2018,'LPG',224,'man',0,5,5,'Black',1,'50.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus '),(51,'Coupe',2015,'Petrol',660,'man',0,2,2,'Red',1,'d0629f27-f3c5-48ec-b75a-1527a4eac728.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus'),(52,'Coupe',2015,'Petrol',460,'man',0,2,2,'Red',1,'2cdedbd0-323f-4f0b-b999-2cbf4ed0c662.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget finibus turpis, in rhoncus');










