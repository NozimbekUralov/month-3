const brands = `
CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(16) NOT NULL
);
`

const cars = `
CREATE TABLE IF NOT EXISTS cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(16) NOT NULL,
    brand INT NOT NULL,
    rent_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (brand) REFERENCES brands (id)
);
`

const roles = `
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(16) NOT NULL
);
`

const users = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (role) REFERENCES roles (id)
);
`

const book_orders = `
CREATE TABLE IF NOT EXISTS book_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user INT NOT NULL,
    car INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user) REFERENCES users (id),
    FOREIGN KEY (car) REFERENCES cars (id)
);
`
module.exports = {
    brands,
    cars,
    roles,
    users,
    book_orders
}