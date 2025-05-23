-- Active: 1741961889820@@127.0.0.1@3306@flowers
CREATE DATABASE IF NOT EXISTS flowers;

use flowers;

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),  
    PRIMARY KEY (id)
);

CREATE TABLE address (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  customer_id INT REFERENCES customers(id),
  region VARCHAR(100),
  city VARCHAR(100),
  street VARCHAR(200)
);

CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE flowers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  color VARCHAR(50),
  price DECIMAL(10,2),
  category_id INT REFERENCES category(id),
  image_path VARCHAR(200),
  import_from VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  description TEXT,
  count INT
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  total_price DECIMAL(10,2),
  order_date DATE,
  adres_id INT REFERENCES address(id),
  status VARCHAR(50)
);

CREATE TABLE order_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  flower_id INT REFERENCES flowers(id),
  quantity INT
);

