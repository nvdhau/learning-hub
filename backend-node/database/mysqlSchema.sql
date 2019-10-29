-- email match with firebase authentication 
DROP DATABASE IF EXISTS learning_hub_3280;

CREATE DATABASE learning_hub_3280;
USE learning_hub_3280;
CREATE TABLE USERS (
    id VARCHAR(200) PRIMARY KEY,   
    username VARCHAR(50),
    full_name TEXT,
    is_active BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE POSTS (
    post_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(200) NOT NULL,
    title TEXT,
    description TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    deleted BOOLEAN NOT NULL DEFAULT 0,

    FOREIGN KEY (author) REFERENCES USERS(id)
);

CREATE TABLE RATING(
    user_id VARCHAR(200),
    post_id INTEGER,
    rating TINYINT NOT NULL,
    PRIMARY KEY (post_id, user_id),
    FOREIGN KEY (post_id) REFERENCES POSTS(post_id),
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

CREATE TABLE ATTACHMENTS(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    type VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    is_local BOOLEAN NOT NULL DEFAULT 1,

    FOREIGN KEY (post_id) REFERENCES POSTS(post_id)
);

CREATE TABLE TAGS(
    tag_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(255),
    tag_slug VARCHAR(255)
); 

CREATE TABLE POST_TAG(
    post_id INTEGER,
    tag_id INTEGER,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES POSTS(post_id),
    FOREIGN KEY (tag_id) REFERENCES TAGS(tag_id)
);

CREATE TABLE COMMENTS(
    comment_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    reply_id INTEGER,
    content TEXT NOT NULL,

    FOREIGN KEY (post_id) REFERENCES POSTS(post_id),
    FOREIGN KEY (reply_id) REFERENCES COMMENTS(comment_id)
);
