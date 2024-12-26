const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let discos = [
    {
        id: 1, 
        titulo: "The Dark Side of the Moon",
        artista: "Pink Floyd",
        edicao: "Remasterizado",
        ano: 1973,
        preco: 250.00,
        formato: "LP",
        disponibilidade: "Em Estoque",
    },
    {
        id: 2,
        titulo: 'Abbey Road',
        artista: 'The Beatles',
        edicao: 'Edição especial',
        ano: 1969,
        preco: 300.00,
        formato: 'LP',
        disponibilidade: 'Em Estoque',
    },
    {
        id: 3,
        titulo: 'Kind of Blue',
        artista: 'Miles Davis',
        edicao: 'Versão Deluxe',
        ano: 1959,
        preco: 180.00,
        formato: 'LP',
        disponibilidade: 'Esgotado',
    }
];

app.post('/discos', (req, res) => {
    const { titulo, artista, edicao, ano, preco, formato, disponibilidade } = req.body;

    console.log('Dados recebidos:', req.body);


    const novoDisco = {
        id: discos.length + 1, 
        titulo,
        artista,
        edicao,
        ano,
        preco,
        formato,
        disponibilidade,
    };

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
    const { titulo, artista, edicao, ano, preco, formato, disponibilidade } = req.body;

    const disco = discos.find(d => d.id === parseInt(id));

    if (!disco) {
        return res.status(404).json({ erro: 'Disco não encontrado' });
    }

    
    disco.titulo = titulo || disco.titulo;
    disco.artista = artista || disco.artista;
    disco.edicao = edicao || disco.edicao;
    disco.ano = ano || disco.ano;
    disco.preco = preco || disco.preco;
    disco.formato = formato || disco.formato;
    disco.disponibilidade = disponibilidade || disco.disponibilidade;

    res.status(200).json(disco);
});

app.delete('/discos/:id', (req, res) => {
    const { id } = req.params;
    const index = discos.findIndex(d => d.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ erro: 'Disco não encontrado' });
    }

    discos.splice(index, 1);
    res.status(204).send(); // Deleta e responde com status 204 (Sem conteúdo)
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
