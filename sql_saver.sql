DROP DATABASE aframe;

drop table if exists score;

CREATE SCHEMA IF NOT EXISTS aframe;

CREATE TABLE score (
	ID int AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    gamertag varchar(255),
    score int,
    PRIMARY KEY (ID)
);

INSERT INTO score VALUES (1, "Nico", "Schroeder", "nicooopicoooo", 24);
INSERT INTO score VALUES (2, "Donald", "Duck", "duckforcewuhu", 50);
INSERT INTO score VALUES (3, "Mickey", "Mouse", "MickMous", 80);
INSERT INTO score VALUES (4, "Daisy", "Duck", "daisyyydays_", 70);
INSERT INTO score VALUES (5, "Dagobert", "Duck", "scroogemcduck", 42);