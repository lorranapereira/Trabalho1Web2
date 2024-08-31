const path = require("node:path");
const Database = require("better-sqlite3");

const db = new Database(path.resolve(__dirname, "../database/users.sqlite3"));

function createDatabaseTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('ADMIN', 'CLIENT')) NOT NULL,
      name VARCHAR(100) NOT NULL,
      cpf CHAR(11) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS emails (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      email VARCHAR(100) NOT NULL,
      is_primary INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS phones (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      phone CHAR(11) NOT NULL,
      is_primary INTEGER DEFAULT 0,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}

function insertDatabaseData() {
  db.exec(`
    DELETE FROM emails;
    DELETE FROM phones;
    DELETE FROM users;

    DELETE FROM sqlite_sequence WHERE name='emails';
    DELETE FROM sqlite_sequence WHERE name='phones';
    DELETE FROM sqlite_sequence WHERE name='users';
    INSERT INTO users (name, cpf, type) VALUES ('Ana Souza', '32165498700', 'ADMIN');
    INSERT INTO emails (user_id, email, is_primary) VALUES (1, 'ana.souza@email.com', 1);
    INSERT INTO phones (user_id, phone, is_primary) VALUES (1, '54987654321', 1);
    
    INSERT INTO users (name, cpf, type) VALUES ('Pedro Lima', '78912345600', 'CLIENT');
    INSERT INTO emails (user_id, email, is_primary) VALUES (2, 'pedro.lima@email.com', 1);
    INSERT INTO phones (user_id, phone, is_primary) VALUES (2, '54912345678', 1);
    
    INSERT INTO users (name, cpf, type) VALUES ('Juliana Costa', '65432178900', 'CLIENT');
    INSERT INTO emails (user_id, email, is_primary) VALUES (3, 'juliana.costa@email.com', 1);
    INSERT INTO emails (user_id, email, is_primary) VALUES (3, 'juliana.costa@outlook.com', 0);
    INSERT INTO phones (user_id, phone, is_primary) VALUES (3, '54998765432', 1);

  `);
}

createDatabaseTables();
insertDatabaseData();

module.exports = db;
