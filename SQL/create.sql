CREATE TABLE user (
    user_id INT PRIMARY KEY,
    user_firstname VARCHAR NOT NULL CHECK(user_firstname <= 50 AND user_firstname >= 3),
    user_lastname VARCHAR NOT NULL CHECK(user_lastname <= 50 AND user_lastname >= 3),
    birth_day DATE NOT NULL CHECK(birth_day < CURRENT_DATE),
    email VARCHAR NOT NULL CHECK(email <= 100 AND email >= 3),
    phone VARCHAR5(10) NOT NULL,
    passions VARCHAR[] CHECK(array_length(passions,1) < 5)
);

CREATE TABLE achevement(

);

CREATE TABLE planning(

);

CREATE TABLE contact(
    contact_id INT PRIMARY KEY,
    
);