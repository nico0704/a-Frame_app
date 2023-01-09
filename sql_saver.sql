CREATE TABLE score (
	ID int AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    gamertag varchar(255),
    score int,
    PRIMARY KEY (ID)
);

INSERT INTO score VALUES (1, "Nico", "Schröder", "nicopico", 24);
INSERT INTO score VALUES (2, "Donald", "Duck", "duckforce", 50);
INSERT INTO score VALUES (3, "Mickey", "Mouse", "MickYMousEX", 80);