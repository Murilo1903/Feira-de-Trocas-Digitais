const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();
 
app.use(cors());
app.use(express.json());
 
const port = 3000;

app.get('/listar', (_req, res) => {
    const query = 'SELECT * from usuarios'
    connection.query(query, (err, result) => {
        if(err){
             return res.status(500).json({success: false, message: 'Erro ao listar usuários.'})
        }
        res.json({success: true, message: 'Usuários listados com sucesso', id: result.insertId, data: result})
    })
})
 
app.post('/cadastrar', (req, res) => {
    const {nome, senha, email} = req.body
    const query = 'INSERT INTO usuarios(nome, senha, email) VALUES(?, ?, ?)'
    connection.query(query, [nome, senha, email], (err, _result) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar usuário.'})
        }
        if (senha.length < 8) {
            return res.status(400).send("A senha precisa ter no mínimo 8 caracteres.");
        }
        res.json({success: true, message: 'Usuário cadastrado com sucesso!'})
    })
})
 
app.put('/editar/:id', (req, res) => {
    const query = 'UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id_usuario = ?';
    const {id} = req.params
    const {nome, senha, email} = req.body;
    connection.query(query, [nome, senha, email, id], (err) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao editar usuário.'})
        }
        if (senha.length < 8) {
        return res.status(400).send("A senha precisa ter no mínimo 8 caracteres.");
        }
       res.json({success: true, message: 'Usuário editado com sucesso'})
    })
})
 
app.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    const query = 'DELETE FROM usuarios WHERE id_usuario = ?'
    connection.query(query, [id], (err) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao deletar usuário.'})
        }
        res.json({success: true, message: 'Usuário deletado com sucesso!'})
    })
})

app.get('/login', (req, res) => {
    const {nome, senha} = req.body;
 
    const query = 'SELECT * FROM usuarios WHERE nome = ? AND senha = ?';
    connection.query(query, [nome, senha], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro no servidor.'});
        }
 
        if (results.length > 0) {
            res.json({ sucess: true, message: 'Login bem-sucedido'})
        } else {
            res.json({ sucess: false, message: 'Nome ou senha incorretos'})
        }
    })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));