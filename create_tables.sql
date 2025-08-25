-- ==============================
-- Drop existing tables (if any)
-- ==============================
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS video_progress;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;

-- ==============================
-- Users Table
-- ==============================
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Base user fields
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('user', 'admin')) DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Extra fields
    firstName TEXT,
    lastName TEXT,
    phone TEXT,
    mobile TEXT,
    gender TEXT CHECK(gender IN ('Male', 'Female')),
    industry TEXT,
    company TEXT,
    website TEXT,
    address_street TEXT,
    address_area TEXT,
    address_city TEXT,
    address_emirate TEXT,
    address_country TEXT
);

-- ==============================
-- Videos Table
-- ==============================
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    uploader_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploader_id) REFERENCES users(id)
);

-- ==============================
-- Comments Table
-- ==============================
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ==============================
-- Video Progress Table
-- ==============================
CREATE TABLE IF NOT EXISTS video_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    progress_seconds INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (video_id, user_id)
);

-- ==============================
-- Likes Table
-- ==============================
CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    video_id INTEGER,
    comment_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (video_id) REFERENCES videos(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    CHECK ((video_id IS NOT NULL) OR (comment_id IS NOT NULL))
);

-- ==============================
-- Seed Example Data
-- ==============================

-- Users
-- INSERT INTO users (name, email, password_hash, role) VALUES
-- ('Alice Instructor', 'alice@example.com', 'hash123', 'user'),
-- ('Bob Student', 'bob@example.com', 'hash456', 'user'),
-- ('Charlie Admin', 'charlie@example.com', 'hash789', 'admin');

-- Videos
INSERT INTO videos (title, description, video_url, thumbnail_url, uploader_id) VALUES
('Intro to React', 'Learn the basics of React.', 'https://example.com/videos/react-intro.mp4', 'https://example.com/thumbs/react.png', 1),
('Advanced Node.js', 'Deep dive into Node.js features.', 'https://example.com/videos/node-advanced.mp4', 'https://example.com/thumbs/node.png', 1);

-- Comments
INSERT INTO comments (video_id, user_id, comment_text) VALUES
(1, 2, 'This React intro is super helpful!'),
(1, 2, 'Can you explain hooks in more detail?'),
(2, 2, 'Node.js async part was tricky but good.');

-- Video Progress
INSERT INTO video_progress (video_id, user_id, progress_seconds) VALUES
(1, 2, 120),
(2, 2, 45);

-- Likes
INSERT INTO likes (user_id, video_id) VALUES
(2, 1),
(2, 2);

INSERT INTO likes (user_id, comment_id) VALUES
(1, 1);
