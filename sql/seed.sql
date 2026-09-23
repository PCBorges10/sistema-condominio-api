USE sistema_condominio;

-- Limpa os dados de teste anteriores
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE moradores;
TRUNCATE TABLE unidades;
TRUNCATE TABLE condominios;

SET FOREIGN_KEY_CHECKS = 1;

-- Condomínios de exemplo
INSERT INTO condominios
(nome, cnpj, endereco, numero, bairro, cidade, estado, cep, telefone, email)
VALUES
(
    'Residencial Aurora',
    '11.111.111/0001-11',
    'Rua das Palmeiras',
    '150',
    'Centro',
    'Sao Paulo',
    'SP',
    '01000-000',
    '11999999999',
    'contato@aurora.com'
),
(
    'Condominio Bela Vista',
    '22.222.222/0001-22',
    'Avenida Brasil',
    '500',
    'Bela Vista',
    'Sao Paulo',
    'SP',
    '02000-000',
    '11888888888',
    'contato@belavista.com'
);

-- Unidades de exemplo
INSERT INTO unidades
(numero, bloco, andar, condominio_id)
VALUES
('101', 'A', 1, 1),
('102', 'A', 1, 1),
('201', 'B', 2, 1),
('301', 'A', 3, 2),
('302', 'A', 3, 2);

-- Moradores de exemplo
INSERT INTO moradores
(nome, cpf, telefone, email, tipo, unidade_id)
VALUES
(
    'Joao Silva',
    '123.456.789-00',
    '11999999999',
    'joao@email.com',
    'proprietario',
    1
),
(
    'Maria Oliveira',
    '987.654.321-00',
    '11888888888',
    'maria@email.com',
    'inquilino',
    2
);