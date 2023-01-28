-- Active: 1674750638187@@127.0.0.1@3306

-- ENDPOINTS DE USER

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now'))
    );

INSERT INTO users(id, name, email, password)
VALUES("id001", "Fulano", "Fulano@gmail.com", "12345");

INSERT INTO users(id, name, email, password)
VALUES("id002", "Beltrano", "Beltrano@gmail.com", "56789");

INSERT INTO users(id, name, email, password)
VALUES("id003", "Ciclano", "Ciclano@gmail.com", "98765");

-- Create user
INSERT INTO users(id, email, password)
VALUES("id004", "Random123@gmail.com", "98764");

-- Edit user by ID
UPDATE users
SET email = "Fulaninho@gmail.com"
WHERE id = "id001";

-- Get All Users email ASC
SELECT * FROM users ORDER BY email ASC;

-- Get All Users
SELECT * FROM users;

-- Delete user by ID
DELETE FROM users
WHERE id = "id004";

DROP TABLE users;

-- ENDPOINTS DE PRODUCTS

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
    );

INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p001", "Mouse gamer", 200.00, "Melhor mouse do mercado!", "https://picsum.photos/seed/Mouse%20gamer/400");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p002", "Monitor", 1200.00, "Monitor LED Full HD 24 polegadas", "https://picsum.photos/seed/Monitor/400");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p003", "Teclado gamer", 400.00, "Recomendado para melhor performance nos jogos", "https://picsum.photos/seed/Teclado%20gamer/400");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p004", "Abacaxi", 8.50, "Fonte de Potássio e Rico em Manganês e Vitamina C", "https://picsum.photos/seed/Abacaxi/400");
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p005", "Ventilador", 99.90, "Mantém o ambiente confortável, arejado e sempre ventilado", "https://picsum.photos/seed/Ventilador/400");

-- Create product
INSERT INTO products(id, name, price, description, imageUrl)
VALUES("p006", "Melancia", 50.00, "Suculenta, doce e refrescante", "https://picsum.photos/seed/Melancia/400");

-- Edit product by ID
UPDATE products
SET name = "Monitor HD"
WHERE id = "p002";

-- Get All Products
SELECT * FROM products;
-- Search Product by name
SELECT * FROM products
WHERE name = "Abacaxi";

-- Get products by ID
SELECT * FROM products
WHERE id = "p001";

-- Get All Products Version 1
SELECT * FROM products ORDER BY price ASC
LIMIT 20 OFFSET 1;
-- Get All Products Version 2
SELECT * FROM products 
WHERE price > 10.00 AND price < 600.00
ORDER BY price ASC;

-- Delete product by ID
DELETE FROM products
WHERE id = "p007";

DROP TABLE products;

-- ENDPOINTS DE PURCHASES

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    createdAt TEXT DEFAULT(DATETIME('now')),
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ("c001", 2400.00, 1, "id001" ),
    ("c002", 400.00, 0, "id001" ),
    ("c003", 34.00, 0, "id002" ),
    ("c004", 499.50, 1, "id002" );

UPDATE purchases
SET createdAt = DATETIME('now')
WHERE id = "c001";


UPDATE purchases
SET createdAt = DATETIME('now')
WHERE id = "c002";


UPDATE purchases
SET createdAt = DATETIME('now')
WHERE id = "c003";

UPDATE purchases
SET createdAt = DATETIME('now')
WHERE id = "c004";

SELECT * FROM purchases;

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

DELETE FROM purchases
WHERE id = "c005";

DROP TABLE purchases;

-- ENDPOINTS DE PURCHASES_PRODUCTS

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ("c001","p002", 2),
    ("c003", "p004", 4),
    ("c004", "p005", 5);

SELECT * FROM purchases_products;

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

DROP TABLE purchases_products;

