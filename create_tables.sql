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
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('student', 'instructor', 'admin')) DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================
-- Videos Table
-- ==============================
CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    instructor_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- ==============================
-- Comments Table
-- ==============================
CREATE TABLE comments (
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
CREATE TABLE video_progress (
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
CREATE TABLE likes (
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
INSERT INTO users (name, email, password_hash, role) VALUES
('Alice Instructor', 'alice@example.com', 'hash123', 'instructor'),
('Bob Student', 'bob@example.com', 'hash456', 'student'),
('Charlie Admin', 'charlie@example.com', 'hash789', 'admin');

-- Videos
INSERT INTO videos (title, description, video_url, thumbnail_url, instructor_id) VALUES
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
