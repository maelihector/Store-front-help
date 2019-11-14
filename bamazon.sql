-- Replace database with new information below if it already exists on the server.
-- Create a new database labeled 'bamazon' on the server.
-- Make known that the database labeled 'bamazon' is being referenced.

--Create a new table labeled 'products' in 'bamazon' database.
  -- Add a column labeled 'product_id', and have 'product_id' be an INTEGER, consist of positive numbers only (UNSIGNED), and automatically increment by 1 (AUTO_INCREMENT) with every new record.
  -- Add a column labeled 'product_name', and have 'product_name' be of a string of up to 255 Variable Characters long, have a UNIQUE string input to avoid duplicates, and return a violation constraint if there is no value input.
  -- Add a column labeled 'department_name', and have 'department_name' be of a string of up to 255 Variable Characters long, and return a violation constraint if there is no value input.
  -- Add a column labeled 'price' and have 'price' store exact numeric data values with two decimals, and return a violation constraint if there is no value input.
  -- Add a column labeled 'stock_quantity' and have 'stock_quantity' be an INTEGER, consist of positive numbers only (UNSIGNED), and return a violation constraint if there is no value input.
  -- Add a column labeled 'products_sold' and have 'products_sold' be an INTEGER, consist of positive numbers only (UNSIGNED), and DEFAULT to 0 if there is no value input.
  -- Add a column labeled 'product_sales' and have 'product_sales' store exact numeric data values with two decimals, and DEFAULT to 0.00 if there is no value input.
  -- Create an index of each row inserted into 'products' table.

-- Specify the columns and the order the following values that will be INSTERTed into said columns.

--Create a new table labeled 'departments' in 'bamazon' database.
  -- Add a column labeled 'department_id', and have 'department_id' be an INTEGER, consist of positive numbers only (UNSIGNED), and automatically increment by 1 (AUTO_INCREMENT) with every new record.
  -- Add a column labeled 'department_name', and have 'department_name' be of a string of up to 255 Variable Characters long, have a UNIQUE string input to avoid duplicates, and return a violation constraint if there is no value input.
  -- Add a column labeled 'overhead_costs' and have 'overhead_costs' store exact numeric data values with two decimals, and return a violation constraint if there is no value input.
  -- Create an index of each row inserted into 'departments' table.

-- Specify the columns and the order the following values that will be INSTERTed into said columns.

DROP DATABASE IF EXISTS bamazon;                        
CREATE DATABASE bamazon;                                
USE bamazon;                                            

CREATE TABLE products (
  `product_id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `product_name` VARCHAR(255) UNIQUE NOT NULL,  
  `department_name` VARCHAR(255) NOT NULL,        
  `price` DECIMAL(10,2) NOT NULL,             
  `stock_quantity` INT UNSIGNED NOT NULL,
  `products_sold` INT UNSIGNED DEFAULT 0,
  `product_sales` DECIMAL(10,2) DEFAULT 0.00,       
  PRIMARY KEY (product_id)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity, products_sold, product_sales) 
VALUES 
('Kindle Paperwhite E-reader', 'Electronics', 119.99, 14, 6, 719.94),
('SpongeBob SquarePants Board Game', 'Toys & Games', 17.85, 25, 5, 89.25),
('GoPro HERO5 Black', 'Electronics', 249.00, 8, 2, 498.00),
('God of War - PS4', 'Video Games', 69.99, 2, 28, 1959.72),
('The Largesse of the Sea Maiden', 'Books', 17.99, 33, 17, 305.83),
('Casual Oversized Baggy Off-Shoulder Shirt', 'Clothing', 35.99, 55, 20, 719.80),
('Baby Banana Infant Teether', 'Baby', 15.99, 11, 29, 463.71),
('BLACK+DECKER Cordless Hand Vacuum', 'Vaccums & Floor Care', 684.39, 7, 3, 2053.17),
('Digital Body Weight Scale', 'Health & Household', 22.35, 4, 36, 804.60),
('Pet Grooming Glove', 'Pet Supplies', 15.50, 60, 40, 620.00),
('1984', 'Books', 12.50, 21, 29, 362.50),
('Monopoly', 'Toys & Games', 15.00, 4, 26, 390.00),
('Apple Watch', 'Electronics', 300, 10, 5, 1500.00),
('Fortnite - PS4', 'Video Games', 59.99, 12, 18, 1079.82),
('Plain White Tee', 'Clothing', 15.00, 65, 10, 150.00),
('Bottle Warmer', 'Baby', 25.00, 30, 10, 250.00),
('Dyson 9 Cordless Handheld Vaccum', 'Vaccums & Floor Care', 300.00, 3, 7, 2100.00),
('White Down Comforter', 'Health & Household', 55.00, 35, 10, 550.00),
('IAMS Hairball Control Catfood', 'Pet Supplies', 23.99, 90, 30, 719.70),
('Mens Denim Jeans', 'Clothing', 42.99, 40, 35, 1504.65)


CREATE TABLE departments (
  `department_id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
  `department_name` VARCHAR(255) UNIQUE NOT NULL,
  `overhead_costs` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, overhead_costs)
VALUES 
('Electronics', 1000.00),
('Toys & Games', 400.00),
('Video Games', 300.00),
('Books', 100.00),
('Clothing', 300.00),
('Baby', 200.00),
('Vaccums & Floor Care', 500.00),
('Health & Household', 450.00),
('Pet Supplies', 150.00)