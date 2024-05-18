const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

// Konfigurasi koneksi ke database
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database",
});

// Membuka koneksi ke database
connection.connect((err) => {
  if (err) {
    return console.error("error connecting: " + err.stack);
  }
  console.log("connected as id " + connection.threadId);
});

// Membaca file .sql
const sqlFilePath = path.join(__dirname, "restore.sql");
const sql = fs.readFileSync(sqlFilePath, "utf8");

// Menjalankan perintah SQL dari file
connection.query(sql, (error, results) => {
  if (error) {
    return console.error("error executing query: " + error.stack);
  }
  console.log("SQL file imported successfully");
});

// Menutup koneksi
connection.end();
