const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '172.16.142.16',     // Endereço do servidor MySQL
  user: 'estudante',          // Usuário do MySQL
  password: 'senai@2024',      // Senha do MySQL
  database: 'banco_loja',// Nome do banco de dados
  port: 3306             // Porta do MySQL somente se necessário)
});

db.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao MySQL:', erro.message);
    return;
  }
  console.log('Conexão com o MySQL estabelecida com sucesso');
});

module.exports = db; 