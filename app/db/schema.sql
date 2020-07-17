
-- This file is not necessary as sequelize creates all tables automatically, but it is useful for visualization. It also no longer reflects the structure of the tables that are being authored by sequelize 
-- as defined in our user, playlist, and vote methods.

-- if you have problems with the database that you are locally testing with
-- run the below code to delete the database, then restart the node server.js
-- and the sequelize sync() function will automatically recreate the database

DROP DATABASE IF EXISTS mixtape_db;
CREATE DATABASE mixtape_db;