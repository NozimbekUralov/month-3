DELETE TABLE IF EXISTS students;

DELETE TABLE IF EXISTS teachers;

DELETE TABLE IF EXISTS "groups";

DELETE TABLE IF EXISTS student_group_map;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "groups" (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL,
    teacher_id BIGINT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teachers (id)
);

CREATE TABLE IF NOT EXISTS student_group_map (
    student_id BIGINT NOT NULL,
    group_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (group_id) REFERENCES "groups" (id),
    PRIMARY KEY (student_id, group_id)
);