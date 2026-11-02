const express= require('express');
const pool=require ('./db');
const app=express();
const PORT=3000;

app.get('/testar-conexao', async (req, res) => {
    try {
        // pool.query() executa SQL e devolve uma Promise
        // O resultado tem a propriedade .rows (as linhas retornadas)
        const resultado = await pool.query('SELECT NOW() AS agora');
        res.json({
            mensagem: 'Conectado ao PostgreSQL com sucesso!',
            dataHoraBanco: resultado.rows[0].agora
        });
    } catch (erro) {
        // Se algo falhar (senha errada, banco inexistente, etc.)
        console.error('Erro na conexão:', erro.message);
        res.status(500).json({ erro: 'Falha ao conectar no banco' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
