ALTER TABLE files
ADD COLUMN user_id UUID NOT NULL;

ALTER TABLE files
ADD CONSTRAINT fk_file_user FOREIGN KEY (user_id)
REFERENCES users (id);