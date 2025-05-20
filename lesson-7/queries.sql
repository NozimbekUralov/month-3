-- get the first ten cars
SELECT c.id, c.model, c.rent_price, b.name as brand, c.created_at
FROM cars c
    LEFT JOIN brands b ON c.brand = b.id
LIMIT 10;

-- get all brands

SELECT * FROM brands;

-- get all roles
SELECT * FROM roles;

-- get the first ten users with roles
SELECT u.id, u.name, u.email, r.name as role, u.created_at
FROM users u
    LEFT JOIN roles r ON u.role = r.id
LIMIT 10;

-- get the first ten book orders
SELECT
    bo.id,
    u.name as user_name,
    c.model as model,
    b.name as brand,
    c.rent_price as rent_price,
    bo.created_at
FROM
    book_orders bo
    LEFT JOIN users u ON bo.user = u.id
    LEFT JOIN cars c ON bo.car = c.id
    LEFT JOIN brands b ON c.brand = b.id
LIMIT 10;