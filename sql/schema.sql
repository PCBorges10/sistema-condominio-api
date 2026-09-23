CREATE DATABASE IF NOT EXISTS sistema_condominio;

USE sistema_condominio;

CREATE TABLE IF NOT EXISTS condominios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20),
    endereco VARCHAR(150),
    numero VARCHAR(20),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(20),
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS unidades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    bloco VARCHAR(50),
    andar INT,
    condominio_id INT NOT NULL,
    FOREIGN KEY (condominio_id) REFERENCES condominios(id)
);

CREATE TABLE IF NOT EXISTS moradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    tipo VARCHAR(20) NOT NULL,
    unidade_id INT NOT NULL,
    FOREIGN KEY (unidade_id) REFERENCES unidades(id)
);