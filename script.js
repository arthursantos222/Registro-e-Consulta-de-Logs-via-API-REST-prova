const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});


app.post('/logs', (req, res) => {
    console.log('Requisição recebida!', req.body);  
    const nomeAluno = req.body.nome;
    
    if (!nomeAluno) {
        return res.status(400).json({ erro: "O nome do aluno é obrigatório." });
    }
    
    const id = uuidv4();  
    const dataHora = new Date().toISOString();  
    const logMessage = `${id} - ${dataHora} - ${nomeAluno}\n`;
    
    
    fs.appendFile('logs.txt', logMessage, (err) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao registrar o log." });
        }
        res.status(200).json({
            mensagem: "Log registrado com sucesso.",
            id: id
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
