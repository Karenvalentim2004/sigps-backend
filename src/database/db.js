const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',   
  password: '', 
  database: 'bd_sigps'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Conectado ao banco de dados com sucesso!");
});

module.exports = connection;