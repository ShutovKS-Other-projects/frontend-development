CREATE DATABASE IF NOT EXISTS products_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE products_db;

DROP TABLE IF EXISTS products;
CREATE TABLE products
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)   NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    description TEXT
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO products (name, price, description)
VALUES ('продукт 1', 10.00, 'Описание для продукта 1'),
       ('продукт 2', 20.00, 'Описание для продукта 2'),
       ('продукт 3', 30.00, 'Описание для продукта 3'),
       ('продукт 4', 40.00, 'Описание для продукта 4'),
       ('продукт 5', 50.00, 'Описание для продукта 5');