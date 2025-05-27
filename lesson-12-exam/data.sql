-- Active: 1747205152277@@mysql-test-9658.e.aivencloud.com@16415
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    count INT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    passport_series VARCHAR(5) NOT NULL,
    passport_number INT NOT NULL
);

CREATE TABLE IF NOT EXISTS discount_conditions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    month INT NOT NULL,
    percent INT NOT NULL,
    agreement VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer INT NOT NULL,
    product INT NOT NULL,
    agreement INT NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer) REFERENCES customers (id),
    FOREIGN KEY (product) REFERENCES products (id),
    FOREIGN KEY (agreement) REFERENCES discount_conditions (id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    is_paid BOOLEAN DEFAULT false,
    contract INT NOT NULL,
    FOREIGN KEY (contract) REFERENCES contracts (id)
);

CREATE TABLE IF NOT EXISTS statuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contract INT NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    FOREIGN KEY (contract) REFERENCES contracts (id)
);

SELECT p.*, c.name as customer_name, ct.create_at
FROM
    contracts ct
    JOIN products p ON ct.product = p.id
    JOIN customers c ON ct.customer = c.id
WHERE
    ct.create_at BETWEEN '2025-04-01' AND '2025-05-30'
LIMIT 1
OFFSET
    10

SELECT
    c.name as customer_name,
    p.name as product_name,
    ct.id as contract_id,
    (
        (
            p.price * dc.percent / 100 * dc.month
        ) - IFNULL(SUM(pm.amount), 0)
    ) AS remaining,
    CAST(
        DATEDIFF(NOW(), ct.create_at) - (
            COUNT(pm.id) * (dc.month / COUNT(pm.id))
        ) AS SIGNED
    ) AS overdue_days
FROM
    contracts ct
    JOIN customers c ON ct.customer = c.id
    JOIN products p ON ct.product = p.id
    JOIN statuses s ON ct.id = s.contract
    JOIN discount_conditions dc ON ct.agreement = dc.id
    JOIN payments pm ON pm.contract = ct.id
WHERE
    s.is_completed = false
GROUP BY
    ct.id
HAVING
    remaining > 0
    AND overdue_days > 0