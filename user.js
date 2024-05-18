const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Konfigurasi koneksi ke database
const client = new Client({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 3000, // Port default PostgreSQL
});

// Membuka koneksi ke database
client.connect((err) => {
  if (err) {
    return console.error("error connecting: " + err.stack);
  }
  console.log("connected");
});

// Membaca file .sql
const sqlFilePath = path.join(__dirname, "path_to_your_file.sql");
const sql = fs.readFileSync(sqlFilePath, "utf8");

// Menjalankan perintah SQL dari file
client.query(sql, (err, res) => {
  if (err) {
    return console.error("error executing query: " + err.stack);
  }
  console.log("SQL file imported successfully");
  client.end((err) => {
    if (err) {
      console.error("error during disconnection", err.stack);
    }
  });
});
