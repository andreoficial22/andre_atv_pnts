const express = require('express');
const db = require('./conexao');

const cors = require ('cors');
app.use(cors());

const app = express();
app.use(express.json());

const porta = 3000;
app.listen(porta, () => {
    console.log("Servidor executando na porta " + porta);
});

// criar uma rota para consultar tb_produtos 
app.get('/produtos', (req, res) => {
    const api_key = req.headers['api_key'];
    if (api_key !== '123456') {
        return res.json({ mensagem: "chave invalida" });
    }

    const sql = "SELECT * FROM tb_produtos";
    db.query(sql, (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "falha ao consultar " + erro.message });
        }
        return res.json(resultados);
    });
}); // fim 1 

// rota para cadastrar produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;
    const sql = "INSERT INTO tb_produtos (nome_produto, preco) VALUES (?, ?)";
    const api_key = req.headers['api_key'];
    if (api_key !== '123456') {
        return res.json({ mensagem: "chave invalida" });
    }

    db.query(sql, [nome, preco], (erro, resultados) => {
        if (erro) {
            return res.json({ mensagem: "falha ao cadastrar " + erro.message });
        }
        return res.json({ mensagem: "cadastrado com sucesso" });
    });
}); // fim da rota cadastrar produto 

// rota para atualizar produto
app.put('/produtos', (req, res) => {
    const { nome, preco, id } = req.body;
    const sql = "UPDATE tb_produtos SET nome_produto = ?, preco = ? WHERE id_produto = ?";
    const api_key = req.headers['api_key'];
    if (api_key !== '123456') {
        return res.json({ mensagem: "chave invalida" });
    }

    db.query(sql, [nome, preco, id], (erro, resultado) => {
        if (erro) {
            return res.json({ mensagem: "falha ao atualizar " + erro.message });
        }
        if (resultado.length === 0) {
            return res.json({ mensagem: "nada alterado" });
        }
        return res.json({ mensagem: "atualizado com sucesso" });
    });
});
