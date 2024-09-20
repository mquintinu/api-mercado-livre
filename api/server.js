import { fastify } from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import corsConfig from './src/config/corsConfig.js';
import productRoutes from './src/routes/productRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const server = fastify();

// CORS
server.register(cors, corsConfig);

// ROTAS
productRoutes(server);

server.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3333 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});