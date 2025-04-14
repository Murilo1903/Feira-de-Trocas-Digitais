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

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));