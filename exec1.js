//importar o express para o projecto(framework que facilida a criação de servidores)

const express=require ('express');
//cria uma instância  do express

const app=express();

//definir a porta aonde o servidor irá escutar(3000 é a porta padrão)

const PORT=3000;
//cria uma rota do tipo GET para o caminho ráis "/"
app.get('/',(req, res)=> {
res.send('Olá , mundo! Meu primeiro servidor Node JS')    
});

//Inicia o servidor e fica ouvindo na porta 3000

app.listen(PORT, ()=> {
    console.log('Servidor rodando, bom trabalho')
});