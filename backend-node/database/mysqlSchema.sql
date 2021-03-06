-- email match with firebase authentication 
DROP DATABASE IF EXISTS learning_hub_4280;

CREATE DATABASE learning_hub_4280;
USE learning_hub_4280;

CREATE TABLE USERS (
    id VARCHAR(200) PRIMARY KEY,   
    username VARCHAR(50),
    full_name TEXT,
    following TEXT,
    followers TEXT,
    favorites TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE CATEGORIES(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) 
);

CREATE TABLE TAGS (
    name VARCHAR(255) PRIMARY KEY NOT NULL
);

CREATE TABLE POSTS (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    category_id INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    tags TEXT,
    image_url TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN NOT NULL DEFAULT 0,
    is_blog BOOLEAN NOT NULL DEFAULT 0, -- blog or tutorial

    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (category_id) REFERENCES CATEGORIES(id)
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
    comment TEXT NOT NULL, -- JSON {created_at: timestamp, content: string, author_id: uid, author_full_name: string}
    replies TEXT, -- JSON [{created_at: timestamp, content: string, author_id: uid, author_full_name: string, receiver_id: uid, receiver_full_name: string}]

    FOREIGN KEY (post_id) REFERENCES POSTS(id)
);
