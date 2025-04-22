CREATE DATABASE Feira;
USE Feira;

CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(35) NOT NULL,
    senha VARCHAR(15) NOT NULL,
    email VARCHAR(35) UNIQUE NOT NULL,
    reputacao INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Postagens (
    id_postagem INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    titulo VARCHAR(40) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    curtidas INT,
    FOREIGN KEY (UserID) REFERENCES Usuarios(id_usuario),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Comentarios(
    id_comentario INT AUTO_INCREMENT PRIMARY KEY,
    PostagemID INT,
    UserID INT,
    FOREIGN KEY (PostagemID) REFERENCES Postagens(id_postagem),
    FOREIGN KEY (UserID) REFERENCES Usuarios(id_usuario)
);