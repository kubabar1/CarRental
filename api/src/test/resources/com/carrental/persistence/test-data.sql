INSERT INTO UserRoles VALUES (1,'ADMIN'),(5,'BLOGGER'),(2,'CUSTOMER'),(3,'OFFICEEMPLOYEE'),(4,'RENTINGEMPLOYEE');

INSERT INTO Users VALUES (1,'Adam','Kowalski','adam123','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','adamkowalski@gmail.com','(0181) 456 4232','2012-02-21','1672121883899');
INSERT INTO Users VALUES (2,'Marek','Pawłowski','marek123','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','marekpawlowski@gmail.com','(0534) 655 6454','2002-02-14','23432333456');
INSERT INTO Users VALUES (3,'Paweł','Nowak','pawel123','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','pawelnowak@gmail.com','(1232) 234 3344','2001-12-11','42324567454');
INSERT INTO Users VALUES (4,'Michał','Adamowski','michal123','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','michaladamowski@gmail.com','(2434) 543 5455','2001-11-21','13242543543');
INSERT INTO Users VALUES (5,'Karolina','Kowalska','karolina123','$2a$04$XwCaQOgYeWbZggslQffbN.91C0PDP1K6Oo5rCMkgrF.31RmqnY8Jm','karolinakowalska@gmail.com','(5443) 234 3343','2000-10-25','24324343234');


INSERT INTO AppUsersRoles VALUES (1,2),(2,2),(3,2),(4,2),(5,2),(1,1),(2,3),(3,4);

INSERT INTO BookingStateCodes VALUES ('CAN','canceled'),('REN','rented'),('RES','reserved'),('RET','returned');

INSERT INTO Equipment VALUES ('ABS','ABS'),('AF','Alufelgi'),('APS','Podgrzewane przednie siedzenia'),('CB','CB Radio'),('CD','CD'),('CZ','Centralny zamek'),('ESP','Elektryczne przednie szyby'),('EUL','Elektrycznie ustawiane lusterka'),('IM','Immobilizer'),('KM','Klimatyzacja manualna'),('PPK','Poduszka powietrzna kierowcy'),('RD','Radio'),('SP','Światła przeciwmgielne'),('WK','Wspomaganie kierownicy');

INSERT INTO VehicleStatus VALUES ('AVI','available'),('UAV','unavailable');

INSERT INTO Locations VALUES (1,'Polska','Warszawa','Poznańska 21','test.polska@test.co.uk','(0112) 886 4792'),(2,'Polska','Kraków','Warszawsma 21','qwerty.polska@asdfg.co.uk','(5345) 232 1234');

INSERT INTO Vehicles VALUES (1,'AB 12321','Alfa Romeo','4C',183.04,1,'AVI',1);
INSERT INTO Vehicles VALUES (2,'BC 57367','BMW','M3',121.24,1,'AVI',1);
INSERT INTO Vehicles VALUES (3,'CD 78435','Dacia','Duster',223.43,1,'UAV',1);
INSERT INTO Vehicles VALUES (4,'DE 85678','Fiat','Panda',143.23,1,'AVI',2);
INSERT INTO Vehicles VALUES (5,'EF 35432','Opel','Vectra',221.12,1,'UAV',2);

INSERT INTO Eqp VALUES (1,'AF'),(1,'CB'),(1,'CD'),(1,'CZ'),(1,'ESP'),(1,'EUL'),(1,'PPK'),(1,'SP'),(1,'WK'),(2,'ABS'),(2,'APS'),(2,'CB'),(2,'CD'),(2,'CZ'),(2,'ESP'),(2,'EUL'),(2,'KM'),(2,'RD'),(3,'ABS'),(3,'AF'),(3,'APS'),(3,'CB'),(3,'CD'),(3,'KM'),(3,'PPK'),(3,'RD'),(3,'SP'),(4,'AF'),(4,'CB'),(4,'CD'),(4,'ESP'),(4,'KM'),(4,'PPK'),(4,'RD'),(4,'SP'),(4,'WK'),(5,'ABS'),(5,'AF'),(5,'CB'),(5,'CD'),(5,'CZ'),(5,'ESP'),(5,'EUL'),(5,'KM'),(5,'RD'),(5,'SP'),(5,'WK');

INSERT INTO VehicleParameters VALUES (1,'Coupe',2017,'LPG',240,'auto',0,2,2,'Red',1,'1.jpg','Sample description 1.');
INSERT INTO VehicleParameters VALUES (2,'Sedan',2012,'Petrol',380,'auto',1,4,5,'Orange',1,'2.jpg','Sample description 2.');
INSERT INTO VehicleParameters VALUES (3,'SUV',2011,'LPG',120,'man',0,4,5,'Blue',0,'3.jpg','Sample description 3.');
INSERT INTO VehicleParameters VALUES (4,'Hatchback',2005,'Petrol',110,'auto',0,4,5,'Black',1,'4.jpg','Sample description 4.');
INSERT INTO VehicleParameters VALUES (5,'Sedan',2012,'LPG',120,'man',1,4,5,'Green',0,'5.jpg','Sample description 5.');

INSERT INTO Comments VALUES (1,1,'The best car!','adam123','2018-02-21 12:22:12',5);
INSERT INTO Stars VALUES (1,1,5);
INSERT INTO Comments VALUES (2,1,'Recommend!','marek123','2018-03-21 11:11:11',3);
INSERT INTO Stars VALUES (2,1,3);
INSERT INTO Comments VALUES (3,1,'Best!','marek123','2018-01-21 11:11:11',4);
INSERT INTO Stars VALUES (3,1,4);
INSERT INTO Comments VALUES (4,2,'test!','adam123','2018-03-21 11:11:11',4);
INSERT INTO Stars VALUES (4,2,4);



