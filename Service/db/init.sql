DROP DATABASE IF EXISTS Stockdog;
CREATE DATABASE Stockdog;
USE Stockdog;

CREATE TABLE User (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   firstName VARCHAR(32),
   lastName VARCHAR(32),
   email VARCHAR(32) UNIQUE,
   password VARCHAR(1024),
   token VARCHAR(1024)
);


CREATE TABLE Portfolio (
   buyPower DECIMAL(13, 2),
   userId INT(11) REFERENCES User(id)
);

CREATE TABLE Ticker (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   ticker VARCHAR(8),
   company VARCHAR(32)
);


CREATE TABLE Transaction (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   sharePrice DECIMAL(13, 2),
   shareCount INT(11),
   isBuy TINYINT(1),
   datetime DATE,
   portfolioId INT(11) REFERENCES Portfolio(id),
   tickerId INT(11) REFERENCES Ticker(id)
);

CREATE TABLE Watchlist (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   portfolioId INT(11) REFERENCES Portfolio(id),
   tickerId INT(11) REFERENCES Ticker(id)
);


CREATE TABLE PortfolioItem (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   shareCount INT(11),
   avgCost INT(11),
   portfolioId INT(11) REFERENCES Portfolio(id),
   tickerId INT(11) REFERENCES Ticker(id)
);
