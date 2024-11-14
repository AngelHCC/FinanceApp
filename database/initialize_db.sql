
-- Create Database
CREATE DATABASE IF NOT EXISTS finance_app;

-- Use the Database
USE finance_app;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income', 'expense') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    date DATE NOT NULL
);

-- Create Goals Table
CREATE TABLE IF NOT EXISTS goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    target_amount DECIMAL(10, 2) NOT NULL,
    current_amount DECIMAL(10, 2) DEFAULT 0
);

-- Insert Sample User Data
INSERT INTO users (username, password) VALUES ('sampleuser', 'samplepass');

-- Insert Sample Transactions Data
INSERT INTO transactions (type, amount, description, date) VALUES 
('income', 5000.00, 'Salary', '2023-01-15'),
('expense', 200.00, 'Groceries', '2023-01-17');

-- Insert Sample Goal Data
INSERT INTO goals (name, target_amount, current_amount) VALUES ('Vacation Fund', 2000, 500);
