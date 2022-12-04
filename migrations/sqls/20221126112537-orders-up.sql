CREATE TABLE IF NOT EXISTS orders(
id SERIAL PRIMARY KEY,
	userId BIGINT,
	status VARCHAR(255),
FOREIGN KEY(userId) 
	  REFERENCES users(id)
	  ON DELETE CASCADE
    ON UPDATE CASCADE
    );