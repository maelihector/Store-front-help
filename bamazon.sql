DROP DATABASE IF EXISTS bamazon;                        -- Replace database with new information below if it already exists on the server.
CREATE DATABASE bamazon;                                -- Create a new database labeled 'bamazon' on the server.
USE bamazon;                                            -- Make known that the database labeled 'bamazon' is being referenced.

CREATE TABLE products (                                 --Create a new table labeled 'products' in 'bamazon' database.
    `item_id` INT UNSIGNED AUTO_INCREMENT NOT NULL,     -- Add a column labeled 'item_id', and have 'item_id' be an INTEGER, consist of positive numbers only (UNSIGNED), automatically increment by 1 (AUTO_INCREMENT) with every new record, and return a violation constraint if there is no value input.
    `product_name` VARCHAR(255) UNIQUE NOT NULL,        -- Add a column labeled 'product_name', and have 'product_name' be of a string of up to 255 Variable Characters long, have a UNIQUE string input to avoid duplicates, and return a violation constraint if there is no value input.
    `department_name` VARCHAR(255) NOT NULL,            -- Add a column labeled 'department_name', and have 'department_name' be of a string of up to 255 Variable Characters long, and return a violation constraint if there is no value input.
    `price` DECIMAL(10,2) NOT NULL,                      -- Add a column labeled 'price' and have 'price' store exact numeric data values with five digits and two decimals, and return a violation constraint if there is no value input.
    `stock_quantity` INT UNSIGNED NOT NULL,             -- Add a column labeled 'stock_quantity' and have 'stock_quantity' be an INTEGER, consist of positive numbers only (UNSIGNED), and return a violation constraint if there is no value input.
    PRIMARY KEY (item_id)                               -- Create an index of each row inserted into 'products' table.
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity) -- Specify the columns and the order the following values that will be inserted into said columns.
VALUES 
('Kindle Paperwhite E-reader', 'Electronics', 119.99, 4),
('SpongeBob SquarePants Board Game', 'Toys & Games', 17.85, 100),
('GoPro HERO5 Black', 'Camera & Photo', 249.00, 300),
('God of War - Playstation 4', 'Video Games', 69.99, 2),
('The Largesse of the Sea Maiden', 'Books', 17.99, 35),
('Casual Oversized Baggy Off-Shoulder Shirt', 'Clothing', 35.99, 55),
('Baby Banana Infant Teether', 'Baby', 15.99, 1),
('BLACK+DECKER Cordless Hand Vacuum', 'Vaccums & Floor Care', 684.39, 7),
('Digital Body Weight Scale', 'Health & Household', 22.35, 10),
('Pet Grooming Glove', 'Pet Supplies', 15.50, 60);
