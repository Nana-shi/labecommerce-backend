-- Active: 1673912726578@@127.0.0.1@3306

CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL
    );

SELECT * FROM users;

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

SELECT * FROM products;

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