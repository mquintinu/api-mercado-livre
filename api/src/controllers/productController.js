import productService from '../services/productService.js';

export const searchByTitle = async (request, reply) => {
  const { title } = request.query;

  try {
    const data = await productService.searchProductByTitle(title);
    return reply.send(data);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return reply.status(500).send({ error: 'Erro ao buscar produtos' });
  }
};

export const findById = async (request, reply) => {
  const { id } = request.params;

  try {
    const data = await productService.searchProductById(id);
    return reply.send(data);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return reply.status(500).send({ error: 'Erro ao buscar produto' });
  }
};
