-- DROP DATABASE
DROP DATABASE IF EXISTS kanban_db;

-- Create the database
CREATE DATABASE kanban_db;

-- Use the database
USE kanban_db;

-- Create the User table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);