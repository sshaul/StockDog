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
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   buyPower DECIMAL(13, 2),
   name VARCHAR(32),
   userId INT(11) REFERENCES User(id),
   leagueId INT(11) REFERENCES League(id)
);


CREATE TABLE Ticker (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   symbol VARCHAR(8),
   company VARCHAR(32)
);


CREATE TABLE Transaction (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   sharePrice DECIMAL(13, 2),
   shareCount INT(11),
   isBuy TINYINT(1),
   datetime DATE,
   portfolioId INT(11) REFERENCES Portfolio(id),
   ticker VARCHAR(8) REFERENCES Ticker(symbol),
   leagueId INT(11) REFERENCES League(id)
);


CREATE TABLE Watchlist (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   portfolioId INT(11) REFERENCES Portfolio(id),
   ticker VARCHAR(8) REFERENCES Ticker(symbol)
);


CREATE TABLE PortfolioHistory (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   portfolioId INT(11) REFERENCES Portfolio(id),
   day DATE,
   value DECIMAL(8, 2)
);


CREATE TABLE PortfolioItem (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   shareCount INT(11),
   avgCost INT(11),
   portfolioId INT(11) REFERENCES Portfolio(id),
   ticker VARCHAR(8) REFERENCES Ticker(symbol)
);


CREATE TABLE League (
   id INT(11) AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(32),
   start DATE,
   end DATE,
   startPos DECIMAL(13, 2),
   inviteCode VARCHAR(6) UNIQUE,
   ownerId INT(11) REFERENCES User(id)
);
