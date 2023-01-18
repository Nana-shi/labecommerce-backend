-- Active: 1673912726578@@127.0.0.1@3306

-- 16/01 -- Introdução a SQL Exercícios

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
    );

DROP TABLE users;

INSERT INTO users(id, email, password)
VALUES("id001", "Fulano@gmail.com", "12345");

INSERT INTO users(id, email, password)
VALUES("id002", "Beltrano@gmail.com", "56789");

INSERT INTO users(id, email, password)
VALUES("id003", "Ciclano@gmail.com", "98765");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
    );

DROP TABLE products;

INSERT INTO products(id, name, price, category)
VALUES("p001", "Abacaxi", 8.55, "Frutas e legumes");
INSERT INTO products(id, name, price, category)
VALUES("p002", "Monitor LCD", 500.00, "Eletrônicos");
INSERT INTO products(id, name, price, category)
VALUES("p003", "Tomate", 4.65, "Frutas e legumes");
INSERT INTO products(id, name, price, category)
VALUES("p004", "Amaciante em pó", 10.35, "Produtos de limpeza");
INSERT INTO products(id, name, price, category)
VALUES("p005", "Ventilador", 69.85, "Eletrônicos");

-- 17/01 -- Aprofundamento SQL Exercícios

-- Get All Users
SELECT * FROM users;
-- Get All Products
SELECT * FROM products;
-- Search Product by name
SELECT * FROM products
WHERE name = "Tomate";
-- Create user
INSERT INTO users(id, email, password)
VALUES("id004", "Random123@gmail.com", "98764");
-- Create product
INSERT INTO products(id, name, price, category)
VALUES("p006", "Melancia", 50.00, "Frutas e legumes");
-- Get products by ID
SELECT * FROM products
WHERE id = "p001";
-- Delete user by ID
DELETE FROM users
WHERE id = "id004";
-- Delete product by ID
DELETE FROM products
WHERE id = "p006";
-- Edit user by ID
UPDATE users
SET email = "Fulaninho@gmail.com"
WHERE id = "id001";
-- Edit product by ID
UPDATE products
SET name = "Sabonete liquido"
WHERE id = "p004";
-- Get All Users email ASC
SELECT * FROM users ORDER BY email ASC;
-- Get All Products Version 1
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;
-- Get All Products Version 2
SELECT * FROM products 
WHERE price > 10.00 AND price < 600.00
ORDER BY price ASC;
