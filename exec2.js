const express= require('express');
const app = express();
const PORT=3000;

const alunos =[
    { id: 1, nome: 'Ana', idade: 20 },
    { id: 2, nome: 'Bruno', idade: 22 },
    { id: 3, nome: 'Carla', idade: 19 }
];

//rota que devolve todos os alunos
app.get('/api/alunos', (req, res) => {
    res.json(alunos);   // res.json() converte automaticamente para JSON
});

//rota que devolve u,a launo pelo ID
app.get('/api/alunos/:id', (req, res) => {
    // req.params.id é uma STRING, por isso convertemos com Number()
    const id = Number(req.params.id);
    // .find() procura no array o rimeiro elemento cujo id coincide
    const aluno = alunos.find(a => a.id === id);

    // Se não encontrar, devolve erro 404 (Not Found)
    if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.json(aluno);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
