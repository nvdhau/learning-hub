-- email match with firebase authentication 
DROP DATABASE IF EXISTS learning_hub_4280;

CREATE DATABASE learning_hub_4280;
USE learning_hub_4280;
CREATE TABLE USERS (
    id VARCHAR(200) PRIMARY KEY,   
    uid VARCHAR(255),
    username VARCHAR(50),
    full_name TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE CATEGORIES(
    category_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) 
);

CREATE TABLE POSTS (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(200) NOT NULL,
    category_id INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    tags TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN NOT NULL DEFAULT 0,

    FOREIGN KEY (author) REFERENCES USERS(id),
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(category_id)
);

CREATE TABLE RATING(
    user_id VARCHAR(200),
    post_id INTEGER,
    rating TINYINT NOT NULL,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES POSTS(id),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE ATTACHMENTS(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    is_local BOOLEAN NOT NULL DEFAULT 1,

    FOREIGN KEY (post_id) REFERENCES POSTS(id)
);

CREATE TABLE COMMENTS(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    reply_id INTEGER,
    content TEXT NOT NULL,

    FOREIGN KEY (post_id) REFERENCES POSTS(id),
    FOREIGN KEY (reply_id) REFERENCES COMMENTS(id)
);
