import { fastify } from 'fastify';
import axios from 'axios';
import cors from '@fastify/cors';

const server = fastify();

// Configuração do CORS
server.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
});

const ENDPOINT_ML = `https://api.mercadolibre.com/sites/MLB/search?q=`;

server.get('/search', async (request, reply) => {
  const { title } = request.query;

  try {
    const response = await axios.get(`${ENDPOINT_ML}${encodeURIComponent(title)}`);
    return reply.send(response.data);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return reply.status(500).send({ error: 'Erro ao buscar produtos' });
  }
});

server.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});