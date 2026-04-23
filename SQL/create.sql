DROP SCHEMA IF EXISTS local CASCADE;
CREATE SCHEMA local;
SET search_path TO local;

CREATE TABLE app_user (
    user_id INT PRIMARY KEY,

    user_firstname VARCHAR(50) NOT NULL
        CHECK (char_length(user_firstname) BETWEEN 3 AND 50),

    user_lastname VARCHAR(50) NOT NULL
        CHECK (char_length(user_lastname) BETWEEN 3 AND 50),

    birth_day DATE NOT NULL
        CHECK (birth_day < CURRENT_DATE),

    email VARCHAR(100) NOT NULL
        CHECK (char_length(email) BETWEEN 3 AND 100),

    phone VARCHAR(10) NOT NULL,

    passions VARCHAR[]
        CHECK (passions IS NULL OR array_length(passions, 1) < 5)
);

CREATE TABLE achevement (
    achevement_id INT PRIMARY KEY,

    achevement_name VARCHAR(250) NOT NULL
        CHECK (char_length(achevement_name) BETWEEN 5 AND 250),

    achevement_date DATE NOT NULL
);

CREATE TABLE planning (
    planning_id INT PRIMARY KEY,

    planning_name VARCHAR(250) NOT NULL
        CHECK (char_length(planning_name) BETWEEN 5 AND 250),

    planning_date DATE NOT NULL,

    planning_check BOOLEAN NOT NULL
);

CREATE TABLE contact (
    contact_id INT PRIMARY KEY,

    contact_name VARCHAR(50) NOT NULL
        CHECK (char_length(contact_name) BETWEEN 3 AND 50),

    contact_role VARCHAR(50) NOT NULL
        CHECK (char_length(contact_role) BETWEEN 3 AND 50),

    contact_img VARCHAR(100) NOT NULL
        CHECK (char_length(contact_img) BETWEEN 3 AND 100)
);