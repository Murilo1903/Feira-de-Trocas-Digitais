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
    if (senha.length < 8) {
        return res.status(400).send("A senha precisa ter no mínimo 8 caracteres.");
    }
    if (senha.length > 15) {
        return res.status(400).send("A senha não pode ter mais que 40 caracteres.");
    }
    connection.query(query, [nome, senha, email], (err, _result) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao cadastrar usuário.'})
        }
        res.json({success: true, message: 'Usuário cadastrado com sucesso!'})
    })
})
 
app.put('/editar/:id', (req, res) => {
    const query = 'UPDATE usuarios SET nome = ?, senha = ?, email = ? WHERE id_usuario = ?';
    const {id} = req.params
    const {nome, senha, email} = req.body;
    if (senha.length > 15) {
        return res.status(401).send("A senha não pode ter mais que 40 caracteres.");
    }
    connection.query(query, [nome, senha, email, id], (err) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao editar usuário.'})
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

app.get('/listar_postagens', (_req, res) => {
    const query = 'SELECT * from Postagens'
    connection.query(query, (err, result) => {
        if(err){
             return res.status(500).json({success: false, message: 'Erro ao listar postagens.'})
        }
        res.json({success: true, message: 'Postagens listadas com sucesso', id: result.insertId, data: result})
    })
})

app.post('/postar/:id', (req, res) => {
    const id_usuario = req.params.id
    const {titulo, descricao} = req.body
    const query = 'INSERT INTO Postagens(id_usuario, titulo, descricao) VALUES(?, ?)'
    connection.query(query, [id_usuario, titulo, descricao], (err, _result) => {
        if(err){
            return res.status(500).json({success: false, message: 'Erro ao publicar postagem'})
        }
        res.json({success: true, message: 'Postagem publicada com sucesso!'})
    })
})



app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));