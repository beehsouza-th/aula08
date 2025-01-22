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
        image:'https://m.media-amazon.com/images/I/51NBsBvL2bL._AC_UL480_FMwebp_QL65_.jpg'
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
        image:'https://www.bing.com/th?id=OPHS.8Usru9oftlHNTw474C474&o=5&pid=21.1&w=136&h=136&qlt=100&dpr=1,3&c=8&pcl=f5f5f5'
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
        image:'https://m.media-amazon.com/images/I/71XmIyYAkyL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        id: 4,
        titulo: "Led Zeppelin IV",
        artista: "Led Zeppelin",
        edicao: "Edição Limitada",
        ano: 1971,
        preco: 350.00,
        formato: "LP",
        disponibilidade: "Em Estoque",
        image:'https://m.media-amazon.com/images/I/81x364UAGAL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        id: 5,
        titulo: "The Wall",
        artista: "Pink Floyd",
        edicao: "Edição Remasterizada",
        ano: 1979,
        preco: 220.00,
        formato: "LP",
        disponibilidade: "Em Estoque",
          image:'https://m.media-amazon.com/images/I/71Cf2vPnnWL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        id: 6,
        titulo: "Hotel California",
        artista: "Eagles",
        edicao: "Edição Especial",
        ano: 1976,
        preco: 280.00,
        formato: "LP",
        disponibilidade: "Esgotado",
          image:'https://m.media-amazon.com/images/I/71rYYgYnr2L._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        id: 7,
        titulo: "Back in Black",
        artista: "AC/DC",
        edicao: "Edição Limitada",
        ano: 1980,
        preco: 200.00,
        formato: "LP",
        disponibilidade: "Em Estoque",
          image:'https://m.media-amazon.com/images/I/71s6glEqRyL._AC_UL480_FMwebp_QL65_.jpg'
    },
    {
        id: 8,
        titulo: "Born to Run",
        artista: "Bruce Springsteen",
        edicao: "Versão Original",
        ano: 1975,
        preco: 190.00,
        formato: "LP",
        disponibilidade: "Em Estoque",
          image:'https://m.media-amazon.com/images/I/81F3mfg8WnL._AC_UL480_FMwebp_QL65_.jpg'
    },
    
    
];

app.post('/discos', (req, res) => {
    const { titulo, artista, edicao, ano, preco, formato, disponibilidade, image } = req.body;

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
        image
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
    const { titulo, artista, edicao, ano, preco, formato, disponibilidade, } = req.body;

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
