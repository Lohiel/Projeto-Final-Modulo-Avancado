import express from 'express';

const app = express();
const PORT = 3000; 

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá! O servidor do hospital está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});