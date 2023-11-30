const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if(err){
    console.error('Database is not connected: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL by ID ' + db.threadId);
});

module.exports = db;