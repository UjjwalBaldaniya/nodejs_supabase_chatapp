CREATE TABLE IF NOT EXISTS "multiple_papers_aichat_favourite" (
    id INT8 PRIMARY KEY DEFAULT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT8 NULL,
    favourite_chat JSONB DEFAULT '{}'
);