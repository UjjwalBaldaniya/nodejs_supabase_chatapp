CREATE TABLE IF NOT EXISTS "pdf_aichat_history" (
    id INT8 PRIMARY KEY DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pdf_id INT8 NULL,
    history JSONB,
    loading_msg TEXT NULL,
    favourite_chat JSONB DEFAULT '[]'
);
