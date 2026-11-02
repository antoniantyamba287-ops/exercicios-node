const express= require ('express');
const pool=require('./db');
const app=express();
const PORT=3000;

app.use(express.json());

app.post('/usuarios',async (req,res) => {
    try {// Desestrutura o corpo da requisição
        const { nome, email } = req.body;

        // Validação básica
        if (!nome || !email) {
            return res.status(400).json({
                erro: 'Os campos "nome" e "email" são obrigatórios'
            });
        }

        // RETURNING * devolve a linha inserida (com o id gerado)
        const resultado = await pool.query(
            'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *', [nome, email]
        );

        // 201 = Created (semântica HTTP correta para criação)
        res.status(201).json(resultado.rows[0]);

    } catch (erro) {
        // Código 23505 no Postgres = violação de UNIQUE
        if (erro.code === '23505') {
            return res.status(409).json({ erro: 'Este email já está registado' });
        }
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao criar utilizador' });
    }
});
app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));