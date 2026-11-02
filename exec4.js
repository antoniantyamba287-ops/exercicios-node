const express= require('express');
const pool=require('./db');
const app=express();
const PORT =3000;

app.get('/usuarios', async (req,res) => {
    try {
       const resultado = await pool.query('SELECT*FROM usuarios ORDER BY id');
       res.json(resultado.rows);

    } catch (error) {
        console.error(erro);
        res.status(500).json({erro: 'Erro ao buscar utilizadores' });
    }
}); 

app.get('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // ⚠️ Usar $1 (query parametrizada) evita SQL Injection
        const resultado = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Utilizador não encontrado' });
        }
        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao buscar utilizador' });
    }

});

app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));


