-- 1. Insert mock data
INSERT INTO
    products (name, price, count)
VALUES ('Laptop', 1200.00, 5),
    ('Phone', 800.00, 10),
    ('Tablet', 600.00, 7);

INSERT INTO
    customers (
        name,
        phone,
        passport_series,
        passport_number
    )
VALUES (
        'Alice',
        '+123456789',
        'AB',
        1234567
    ),
    (
        'Bob',
        '+987654321',
        'CD',
        7654321
    );

INSERT INTO
    discount_conditions (month, percent, agreement)
VALUES (12, 10, 'Standard 1 year'),
    (6, 5, 'Half year');

-- Insert contracts with create_at in and out of the target range
INSERT INTO
    contracts (
        customer,
        product,
        agreement,
        create_at
    )
VALUES (1, 1, 1, '2025-04-10'), -- in range
    (2, 2, 2, '2025-05-15'), -- in range
    (1, 3, 1, '2025-03-01');
-- out of range

-- Insert payments for contracts
INSERT INTO
    payments (
        amount,
        is_paid,
        contract,
        created_at
    )
VALUES (100.00, true, 1, '2025-04-15'),
    (200.00, true, 1, '2025-05-01'),
    (50.00, true, 2, '2025-05-20'),
    (
        300.00,
        false,
        3,
        '2025-03-10'
    );

-- Insert statuses
INSERT INTO
    statuses (contract, is_completed)
VALUES (1, true),
    (2, true),
    (3, false);