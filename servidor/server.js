const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Dados de exemplo de discos
let discos = [
    {
        id: 1,
        titulo: 'The Dark Side of the Moon',
        artista: 'Pink Floyd',
        genero: 'Rock Progressivo',
        ano: 1973,
        preco: 250.00,
        formato: 'LP',
        disponibilidade: 'Em Estoque',
        image: ''
    },
    {
        id: 2,
        titulo: 'Abbey Road',
        artista: 'The Beatles',
        genero: 'Rock',
        ano: 1969,
        preco: 300.00,
        formato: 'LP',
        disponibilidade: 'Em Estoque',
        image: ''
    },
    {
        id: 3,
        titulo: 'Kind of Blue',
        artista: 'Miles Davis',
        genero: 'Jazz',
        ano: 1959,
        preco: 180.00,
        formato: 'LP',
        disponibilidade: 'Esgotado',
        image: ''
    }
];

// Dados de exemplo de usuários
let usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao@exemplo.com'
    },
    {
        id: 2,
        nome: 'Maria Souza',
        email: 'maria@exemplo.com'
    }
];

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }

    const novoUsuario = { id: usuarios.length + 1, nome, email };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = usuarios.find(u => u.id === parseInt(id));

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;

    res.status(200).json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuarios.splice(index, 1);
    res.status(204).send();
});

// Rotas para discos
app.post('/discos', (req, res) => {
    const { titulo, artista, genero, ano, preco, formato, disponibilidade, image } = req.body;

    if (!titulo || !artista || !genero || !ano || !preco || !formato || !disponibilidade) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const novoDisco = { id: discos.length + 1, titulo, artista, genero, ano, preco, formato, disponibilidade, image };
    discos.push(novoDisco);

    res.status(201).json(novoDisco);
});

app.get('/discos', (req, res) => {
    res.status(200).json(discos);
});

app.get('/discos/:id', (req, res) => {
    const { id } = req.params;
    const disco = discos.find(d => d.id === parseInt(id));

    if (!disco) {
        return res.status(404).json({ erro: 'Disco não encontrado' });
    }

    res.status(200).json(disco);
});

app.put('/discos/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, artista, genero, ano, preco, formato, disponibilidade, image } = req.body;

    const disco = discos.find(d => d.id === parseInt(id));

    if (!disco) {
        return res.status(404).json({ erro: 'Disco não encontrado' });
    }

    disco.titulo = titulo || disco.titulo;
    disco.artista = artista || disco.artista;
    disco.genero = genero || disco.genero;
    disco.ano = ano || disco.ano;
    disco.preco = preco || disco.preco;
    disco.formato = formato || disco.formato;
    disco.disponibilidade = disponibilidade || disco.disponibilidade;
    disco.image = image || disco.image;

    res.status(200).json(disco);
});

app.delete('/discos/:id', (req, res) => {
    const { id } = req.params;
    const index = discos.findIndex(d => d.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Disco não encontrado' });
    }

    discos.splice(index, 1);
    res.status(204).send();
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
