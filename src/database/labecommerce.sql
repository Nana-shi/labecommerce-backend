-- Active: 1673912726578@@127.0.0.1@3306

-- 16/01 -- Introdução a SQL Exercícios

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now'))
    );

DROP TABLE users;

INSERT INTO users(id, name, email, password)
VALUES("id001", "Fulano", "Fulano@gmail.com", "12345");

INSERT INTO users(id, name, email, password)
VALUES("id002", "Beltrano", "Beltrano@gmail.com", "56789");

INSERT INTO users(id, name, email, password)
VALUES("id003", "Ciclano", "Ciclano@gmail.com", "98765");

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
    );

DROP TABLE products;

INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p001", "Abacaxi", 8.55, "Fruta amarela", "imageAbacaxi.com");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p002", "Monitor LCD", 500.00, "Eletrônico lazer", "imageMonitor.com");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p003", "Tomate", 4.65, "Fruta vermelha", "imageTomate.com");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p004", "Amaciante em pó", 10.35, "Produtos de limpeza", "imageAmaciante.com");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p005", "Ventilador", 69.85, "Eletrônico portátil", "imageVentilador.com");

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

-- 18/01 -- Relações em SQL I Exercicios

--Exercicio 1
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    createdAt TEXT DEFAULT(DATE('now')),
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

--Exercicio 2
INSERT INTO purchases (id, total_price, paid, createdAt, buyer_id)
VALUES
    ("c001", 1000.00, 1000.00, NULL, "id001" ),
    ("c002", 17.00, 17.00, NULL, "id001" ),
    ("c003", 20.70, 20.70, NULL, "id002" ),
    ("c004", 139.70, 139.70, NULL, "id002" );

UPDATE purchases
SET createdAt = DATE('now')
WHERE id = "c001";


UPDATE purchases
SET createdAt = DATE('now')
WHERE id = "c002";


UPDATE purchases
SET createdAt = DATE('now')
WHERE id = "c003";


UPDATE purchases
SET createdAt = DATE('now')
WHERE id = "c004";

--Exercicio3
SELECT * FROM purchases;

DELETE FROM purchases
WHERE id = "c005";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

SELECT purchases.id AS purchaseId,
    purchases.total_price,
    purchases.paid,
    purchases.createdAt,
    purchases.buyer_id,
    users.id AS userId,
    users.email,
    users.password FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE buyer_id = "id002";

-- 19/01 -- Relações em SQL II Exercicios

--Exercicio 1
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

--Exercicio 2
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("c001","p002", 2),
    ("c003", "p004", 2),
    ("c004", "p005", 2);

SELECT purchases.id AS purchaseId,
    products.id AS productId,
    products.name AS productName,
    products.description AS productDescription,
    products.imageUrl AS imageProduct,
    purchases_products.quantity,
    purchases.buyer_id,
    purchases.paid AS paid,
    purchases.total_price,
    purchases.createdAt FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;
