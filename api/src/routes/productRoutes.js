import { searchByTitle, findById } from '../controllers/productController.js';

export default function productRoutes(server) {
  server.get('/searchByTitle', searchByTitle);
  server.get('/findById/:id', findById);
}